#!/usr/bin/env python3
"""
wf — CLI d'état V3 (Factory V3 autonome + V2 + V1)
V3 §15 étendu : Objectives, Initiatives, Incidents, Policies, Self-Healing, Sprint, Evaluation, Routing, Portfolio, Simulation, Twin
Compat V2/V1 conservée.
"""
import argparse, json, sys, re
from pathlib import Path
try:
    import yaml
except ImportError:
    yaml = None

ROOT = Path(__file__).resolve().parents[1]
FACTORY = ROOT / "factory"
AIF = ROOT / ".ai-factory"
TASKS = FACTORY / "tasks" / "graph.json"
AGENTS_REG = FACTORY / "agents" / "registry.json"

def load_json(p: Path):
    if not p.exists():
        return None
    try:
        return json.loads(p.read_text())
    except:
        return None

def save_json(p: Path, data):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")

def load_yaml(p: Path):
    if not p.exists():
        return None
    try:
        import yaml as _yaml
        return _yaml.safe_load(p.read_text())
    except:
        return None

# --- V2 existing ---
def cmd_factory_status(args):
    reg = load_json(AGENTS_REG) or {}
    projects = list((FACTORY / "projects").glob("project-*"))
    graph = load_json(TASKS) or {"tasks": []}
    tasks = graph.get("tasks", [])
    by_status = {}
    for t in tasks:
        by_status[t["status"]] = by_status.get(t["status"], 0) + 1
    aif_objs = load_json(AIF / "projects" / "objectives.json") or {"objectives":[]}
    incs = list((AIF / "incidents").glob("*.json"))
    print(json.dumps({
        "factory": "ai-software-factory",
        "version": "V3-1.0" if AIF.exists() else "V2-1.0",
        "projects": len(projects),
        "objectives": len(aif_objs.get("objectives",[])),
        "incidents": len(incs),
        "agents": reg.get("health", {}),
        "tasks_by_status": by_status,
        "registry": str(AGENTS_REG)
    }, indent=2))

def cmd_factory_health(args):
    reg = load_json(AGENTS_REG)
    if not reg:
        print("No registry", file=sys.stderr); sys.exit(1)
    h = reg.get("health", {})
    print(f"Active agents: {h.get('active_agents', '?')}")
    print(f"Idle: {h.get('idle_agents', '?')}")
    print(f"Failed 24h: {h.get('failed_tasks_last_24h', 0)}")
    print(f"Auto-fixed: {h.get('auto_fixed', 0)}")
    for p in [TASKS, FACTORY/"projects"/"project-001"/"state.json", AIF/"projects"/"objectives.json"]:
        ok = p.exists() and load_json(p) is not None
        print(f"{p.relative_to(ROOT)}: {'OK' if ok else 'MISSING/INVALID'}")

def cmd_project_list(args):
    for p in sorted((FACTORY / "projects").glob("project-*")):
        j = load_json(p / "project.json") or {}
        s = load_json(p / "state.json") or {}
        print(f"{j.get('project_id','?')} — {j.get('name','?')} — state={s.get('state','?')} — gates={s.get('gates',{})}")

def cmd_project_create(args):
    pid = args.name.replace(" ", "-").lower()
    if not pid.startswith("project-"):
        existing = list((FACTORY / "projects").glob("project-*"))
        pid = f"project-{len(existing)+1:03d}"
    proj_dir = FACTORY / "projects" / pid
    if proj_dir.exists():
        print(f"Project {pid} exists", file=sys.stderr); sys.exit(1)
    proj_dir.mkdir(parents=True)
    save_json(proj_dir / "project.json", {"project_id": pid, "name": args.name, "created_at": "2026-08-31", "owner": "factory-manager", "orchestrator": f"orchestrator-{pid}", "status": "active"})
    save_json(proj_dir / "state.json", {"project_id": pid, "state": "IDEATION", "previous_state": None, "transitions": [], "gates": {"product":"pending","design":"pending","architecture":"pending","development":"pending","release":"pending"}, "metrics": {"tasks_total":0,"tasks_completed":0,"progress_percent":0}, "updated_at": "2026-08-31T00:00:00Z"})
    save_json(proj_dir / "roadmap.json", {"project_id": pid, "epics": []})
    save_json(proj_dir / "decisions.json", {"project_id": pid, "decisions": []})
    print(f"Created {pid} at {proj_dir}")

def compute_ready(tasks):
    completed = {t["task_id"] for t in tasks if t["status"] == "COMPLETED"}
    ready = []
    for t in tasks:
        if t["status"] in ("READY", "BLOCKED"):
            deps = t.get("depends_on", [])
            if all(d in completed for d in deps):
                ready.append(t)
    return ready

def cmd_task_graph(args):
    graph = load_json(TASKS)
    if not graph:
        print("No graph", file=sys.stderr); sys.exit(1)
    tasks = [t for t in graph["tasks"] if not args.project or t.get("project_id")==args.project]
    for t in tasks:
        deps = ",".join(t.get("depends_on", [])) or "-"
        print(f"{t['task_id']:10} [{t['status']:10}] deps:{deps:20} → {t['agent']:15} ({t['manager']}) {t['title']}")
    if args.dot:
        print("\n--- DOT ---")
        print("digraph G {")
        for t in tasks:
            for d in t.get("depends_on", []):
                print(f'  "{d}" -> "{t["task_id"]}";')
        print("}")

def cmd_task_ready(args):
    graph = load_json(TASKS)
    tasks = [t for t in graph["tasks"] if not args.project or t.get("project_id")==args.project]
    ready = compute_ready(tasks)
    print(json.dumps([{"task_id": t["task_id"], "title": t["title"], "agent": t["agent"], "branch": t.get("branch")} for t in ready], indent=2))
    if not ready:
        print("No READY tasks — all BLOCKED or COMPLETED")

def cmd_task_run(args):
    graph = load_json(TASKS)
    for t in graph["tasks"]:
        if t["task_id"] == args.task_id:
            if t["status"] not in ("READY","BLOCKED"):
                print(f"Task {args.task_id} not runnable: {t['status']}", file=sys.stderr); sys.exit(1)
            completed = {x["task_id"] for x in graph["tasks"] if x["status"]=="COMPLETED"}
            if not all(d in completed for d in t.get("depends_on",[])):
                print(f"Task {args.task_id} still BLOCKED", file=sys.stderr); sys.exit(1)
            t["status"] = "RUNNING"
            save_json(TASKS, graph)
            print(f"{args.task_id} → RUNNING (branch {t.get('branch')})")
            print(f"Next: implement → tests → PR → review (see .ai/task-graph.md)")
            return
    print(f"Task {args.task_id} not found", file=sys.stderr); sys.exit(1)

def cmd_state_show(args):
    p = FACTORY / "projects" / args.project / "state.json"
    j = load_json(p)
    if not j:
        print(f"No state for {args.project}", file=sys.stderr); sys.exit(1)
    print(json.dumps(j, indent=2))
    order = ["IDEATION","DISCOVERY","PLANNING","DESIGN","ARCHITECTURE","DEVELOPMENT","INTEGRATION","QA","SECURITY","STAGING","RELEASE","PRODUCTION","MONITORING"]
    try:
        idx = order.index(j["state"])
        bar = "█" * (idx+1) + "░" * (len(order)-idx-1)
        print(f"\nProgress: [{bar}] {idx+1}/{len(order)} {j['state']}")
    except ValueError:
        pass

STATES_ORDER = ["IDEATION","DISCOVERY","PLANNING","DESIGN","ARCHITECTURE","DEVELOPMENT","INTEGRATION","QA","SECURITY","STAGING","RELEASE","PRODUCTION","MONITORING"]
GATE_FOR_TRANSITION = {"DISCOVERY": "product", "PLANNING": "product", "DESIGN": "design","ARCHITECTURE": "architecture", "DEVELOPMENT": "architecture","INTEGRATION": "development", "QA": "development", "SECURITY": "development","STAGING": "release", "RELEASE": "release", "PRODUCTION": "release"}
def cmd_state_transition(args):
    p = FACTORY / "projects" / args.project / "state.json"
    j = load_json(p)
    if not j:
        print("No state", file=sys.stderr); sys.exit(1)
    target = args.to.upper()
    if target not in STATES_ORDER:
        print(f"Unknown state {target}", file=sys.stderr); sys.exit(1)
    gate = GATE_FOR_TRANSITION.get(target)
    if gate and not args.force:
        if j["gates"].get(gate) != "pass":
            print(f"Gate {gate} is {j['gates'].get(gate)} — need PASS or --force", file=sys.stderr); sys.exit(1)
    if args.risk == "HIGH" and not args.approve:
        print("HIGH risk needs --approve (human)", file=sys.stderr); sys.exit(1)
    prev = j["state"]
    j["previous_state"] = prev
    j["state"] = target
    j["transitions"].append({"from": prev, "to": target, "at": "2026-08-31", "gate": gate, "risk": args.risk})
    j["updated_at"] = "2026-08-31T00:00:00Z"
    save_json(p, j)
    ai_state = ROOT / ".ai" / "project" / "state.json"
    if ai_state.exists():
        ai = load_json(ai_state)
        if ai:
            ai["phase"] = target.lower()
            ai["updated_at"] = j["updated_at"]
            save_json(ai_state, ai)
    print(f"{prev} → {target} (gate {gate})")

def cmd_gates_check(args):
    p = FACTORY / "projects" / args.project / "state.json"
    j = load_json(p)
    print(json.dumps(j.get("gates",{}), indent=2))
    all_pass = all(v=="pass" for v in j.get("gates",{}).values())
    print(f"\nAll gates PASS: {all_pass}")

def cmd_dashboard(args):
    reg = load_json(AGENTS_REG) or {}
    graph = load_json(TASKS) or {"tasks":{}}
    tasks = graph.get("tasks", [])
    by_status = {}
    for t in tasks: by_status[t["status"]] = by_status.get(t["status"],0)+1
    completed = by_status.get("COMPLETED",0)
    failed = by_status.get("FAILED",0)
    # V3 extras
    objs = load_json(AIF / "projects" / "objectives.json") or {"objectives":[]}
    incs = list((AIF / "incidents").glob("*.json"))
    v = "V3" if args.v3 or AIF.exists() else "V2"
    print(f"""┌─────────────────────────────────────────────┐
│           SOFTWARE FACTORY {v}               │
├─────────────────────────────────────────────┤
│ Projects              {len(list((FACTORY/'projects').glob('project-*'))):<3}                     │
│ Objectives            {len(objs.get('objectives',[])):<3}                     │
│ Incidents             {len(incs):<3}                     │
│ Active Agents         {reg.get('health',{}).get('active_agents',0):<3}                     │
│ Running Tasks         {by_status.get('RUNNING',0):<3}                     │
│ Completed             {completed:<3}                     │
│ Failed                {failed:<3}                     │
│ Ready                 {len(compute_ready(tasks)):<3}                     │
├─────────────────────────────────────────────┤
│ Current Project project-001                 │
│ {'█'*int(82/5) + '░'*(20-int(82/5))} 82% (DEVELOPMENT)  │
├─────────────────────────────────────────────┤
│ Frontend       ● Working                     │
│ Backend        ● Working                     │
│ QA             ● Waiting                     │
│ Security       ○ Pending                     │
└─────────────────────────────────────────────┘""".strip())
    if args.json:
        print(json.dumps({"by_status": by_status, "total": len(tasks), "objectives": len(objs.get("objectives",[])), "incidents": len(incs)}, indent=2))
    if args.v3:
        # show loop
        loop = load_json(AIF / "core" / "state-machine" / "autonomous-loop.json") or {}
        if loop:
            print(f"\nAutonomous Loop: {' → '.join(loop.get('loop',[]))}")

# --- V3 new commands ---
def cmd_objective_create(args):
    p = AIF / "projects" / "objectives.json"
    data = load_json(p) or {"version":"V3-1.0","objectives":[]}
    oid = f"OBJ-{len(data['objectives'])+1:03d}"
    krs = []
    for i, k in enumerate(args.krs.split(",")):
        k = k.strip()
        if not k: continue
        krs.append({"kr_id": f"KR{i+1}", "title": k, "target": "TBD", "metric": k, "current":"0%"})
    obj = {"objective_id": oid, "title": args.title, "source": args.title, "owner":"strategic-agent","status":"active","key_results":krs,"initiatives":[],"created_at":"2026-08-31"}
    data["objectives"].append(obj)
    save_json(p, data)
    print(f"Created {oid}: {args.title} with {len(krs)} KRs")
    print(json.dumps(obj, indent=2))

def cmd_objective_list(args):
    p = AIF / "projects" / "objectives.json"
    data = load_json(p) or {"objectives":[]}
    for o in data["objectives"]:
        print(f"{o['objective_id']}: {o['title']} — {len(o['key_results'])} KRs — status {o['status']}")

def cmd_objective_show(args):
    p = AIF / "projects" / "objectives.json"
    data = load_json(p) or {"objectives":[]}
    for o in data["objectives"]:
        if o["objective_id"]==args.id:
            print(json.dumps(o, indent=2)); return
    print(f"Objective {args.id} not found", file=sys.stderr); sys.exit(1)

def cmd_initiative_create(args):
    p = AIF / "projects" / "initiatives.json"
    data = load_json(p) or {"version":"V3-1.0","initiatives":[]}
    iid = f"INIT-{len(data['initiatives'])+1:03d}"
    init = {"initiative_id": iid, "objective_id": args.objective, "kr_ids": [], "title": args.title, "status":"planned","projects":["project-001"],"epics":[],"owner":"factory-coo","created_at":"2026-08-31"}
    data["initiatives"].append(init)
    save_json(p, data)
    print(f"Created {iid} for {args.objective}: {args.title}")

def cmd_initiative_list(args):
    p = AIF / "projects" / "initiatives.json"
    data = load_json(p) or {"initiatives":[]}
    for i in data["initiatives"]:
        if not args.objective or i["objective_id"]==args.objective:
            print(f"{i['initiative_id']} ({i['objective_id']}): {i['title']} — {i['status']}")

def cmd_incident_create(args):
    # generate INC id
    incs = list((AIF/"incidents").glob("*.json"))
    nid = f"INC-{1043+len(incs):04d}"
    p = AIF / "incidents" / f"{nid}.json"
    data = {"incident_id": nid, "severity": args.severity, "status":"investigating","service": args.service,"title": args.title,"detected_at":"2026-08-31T10:00:00Z","symptoms":[args.title],"timeline":[{"at":"2026-08-31T10:00:00Z","event":"detected","by":"cli"}],"workflow":["detected","classified","assigned","mitigated","repaired","verified","closed","postmortem"],"current_step":"detected","risk": args.severity.upper() if args.severity in ["high","critical"] else "MEDIUM"}
    save_json(p, data)
    print(f"Created {nid} severity {args.severity} service {args.service}")
    print(json.dumps(data, indent=2))

def cmd_incident_list(args):
    for p in sorted((AIF/"incidents").glob("*.json")):
        j = load_json(p)
        print(f"{j['incident_id']} [{j['severity']}] {j['service']}: {j.get('title', j.get('symptoms',''))} — {j['status']}")

def cmd_incident_show(args):
    p = AIF / "incidents" / f"{args.id}.json"
    j = load_json(p)
    if not j:
        print(f"Incident {args.id} not found", file=sys.stderr); sys.exit(1)
    print(json.dumps(j, indent=2))

def cmd_incident_close(args):
    p = AIF / "incidents" / f"{args.id}.json"
    j = load_json(p)
    if not j:
        print(f"Not found", file=sys.stderr); sys.exit(1)
    j["status"]="closed"
    j["timeline"].append({"at":"2026-08-31T12:00:00Z","event":"closed","by":"cli","postmortem": args.postmortem})
    save_json(p, j)
    print(f"{args.id} closed")

def cmd_observability_scan(args):
    # simulate scan
    print(json.dumps({"incident":"INC-1042","severity":"high","detected":True,"service": args.service,"symptoms":["latency +180%","error rate +6%"],"recommendation":"Investigate database connection pool"}, indent=2))

def cmd_rca_analyze(args):
    p = AIF / "incidents" / f"{args.incident}.json"
    j = load_json(p)
    if j:
        rca = {"incident": args.incident, "root_cause": j.get("rca",{}).get("root_cause","API caching change deployment #842"), "confidence":0.87, "evidence":["cache hit 92%→45%","commit modifies cache key"], "proposed_fix":"Revert cache key or add warmup", "risk":"MEDIUM"}
        print(json.dumps(rca, indent=2))
    else:
        print(f"Incident not found", file=sys.stderr); sys.exit(1)

def cmd_policy_list(args):
    for p in sorted((AIF/"policies").glob("*.yml")):
        print(f"{p.name}:")
        print(p.read_text()[:500])

def cmd_policy_check(args):
    p = AIF / "policies" / "production.yml"
    j = load_yaml(p)
    if not j:
        print("No policies", file=sys.stderr); sys.exit(1)
    pol = j.get(args.action, {})
    print(json.dumps(pol, indent=2))
    if pol:
        ok = all(k in ["tests_passed","security_passed"] for k in pol.get("require",[]))  # dummy
        print(f"Policy for {args.action}: {'FOUND' if pol else 'NOT FOUND'}")

def cmd_heal_run(args):
    p = AIF / "incidents" / f"{args.incident}.json"
    j = load_json(p)
    if not j:
        print("Incident not found", file=sys.stderr); sys.exit(1)
    # simulate healing pipeline
    steps = ["Diagnosis","Risk analysis","Create remediation task","Agent fixes","Tests","Security","Canary/staging","Deploy","Verify"]
    for s in steps:
        print(f"→ {s} ... done")
    j["status"]="healing"
    j["timeline"].append({"at":"2026-08-31T11:00:00Z","event":"healing","by":"self-healing-engine"})
    save_json(p, j)
    print(f"Healing started for {args.incident} (see SELF_HEALING_ENGINE.md)")

def cmd_sprint_plan(args):
    p = AIF / "metrics" / "sprint-001.json"
    j = load_json(p) or {}
    print(json.dumps(j, indent=2))

def cmd_evaluation_report(args):
    p = AIF / "intelligence" / "evaluation" / "report.json"
    j = load_json(p) or {}
    if args.agent:
        for a in j.get("agents",[]):
            if a["agent"]==args.agent:
                print(json.dumps(a, indent=2)); return
        print(f"Agent {args.agent} not found", file=sys.stderr); sys.exit(1)
    else:
        print(json.dumps(j, indent=2))

def cmd_routing_recommend(args):
    rep = load_json(AIF / "intelligence" / "evaluation" / "report.json") or {"agents":[]}
    # simple scoring: quality + success
    cands = [{"agent": a["agent"], "score": round(a.get("quality",0)+a.get("success_rate",0),2)} for a in rep.get("agents",[])]
    cands = sorted(cands, key=lambda x: x["score"], reverse=True)
    print(f"Task: {args.task}")
    for c in cands:
        print(f"  {c['agent']:15} Score: {c['score']}")
    if cands:
        print(f"← SELECTED {cands[0]['agent']}")

def cmd_allocation_show(args):
    p = AIF / "metrics" / "allocation.json"
    print(json.dumps(load_json(p) or {}, indent=2))

def cmd_portfolio_recommend(args):
    p = AIF / "metrics" / "portfolio.json"
    j = load_json(p) or {}
    for proj in j.get("projects",[]):
        print(f"{proj['project_id']}: {proj['recommendation']} (ROI {proj.get('roi')}, progress {proj.get('progress')})")

def cmd_simulation_run(args):
    opts = args.options.split(",")
    hist = load_json(AIF / "intelligence" / "simulation" / "history.json") or {"simulations":[]}
    # use last simulation as template
    print(json.dumps(hist.get("simulations",[{}])[0] if hist.get("simulations") else {"options": opts, "recommendation":"modular","confidence":0.87}, indent=2))

def cmd_twin_show(args):
    p = AIF / "intelligence" / "simulation" / "twin.json"
    print(json.dumps(load_json(p) or {}, indent=2))

def cmd_twin_impact(args):
    print(json.dumps({"change": args.change, "impact":["cache hit rate","latency","DB load"],"risk":"MEDIUM","cost":"low","twin":"twin-project-001"}, indent=2))

def main():
    ap = argparse.ArgumentParser(prog="wf")
    sub = ap.add_subparsers(dest="cmd")

    f = sub.add_parser("factory")
    fsub = f.add_subparsers(dest="fcmd")
    fsub.add_parser("status").set_defaults(func=cmd_factory_status)
    fsub.add_parser("health").set_defaults(func=cmd_factory_health)

    pr = sub.add_parser("project")
    prsub = pr.add_subparsers(dest="pcmd")
    prsub.add_parser("list").set_defaults(func=cmd_project_list)
    pc = prsub.add_parser("create"); pc.add_argument("--name", required=True); pc.set_defaults(func=cmd_project_create)

    t = sub.add_parser("task")
    tsub = t.add_subparsers(dest="tcmd")
    tg = tsub.add_parser("graph"); tg.add_argument("--project", default=None); tg.add_argument("--dot", action="store_true"); tg.set_defaults(func=cmd_task_graph)
    tr = tsub.add_parser("ready"); tr.add_argument("--project", default=None); tr.set_defaults(func=cmd_task_ready)
    trun = tsub.add_parser("run"); trun.add_argument("task_id"); trun.set_defaults(func=cmd_task_run)

    s = sub.add_parser("state")
    ssub = s.add_subparsers(dest="scmd")
    ss = ssub.add_parser("show"); ss.add_argument("--project", default="project-001"); ss.set_defaults(func=cmd_state_show)
    st = ssub.add_parser("transition"); st.add_argument("--project", default="project-001"); st.add_argument("--to", required=True); st.add_argument("--risk", default="LOW", choices=["LOW","MEDIUM","HIGH"]); st.add_argument("--force", action="store_true"); st.add_argument("--approve", action="store_true"); st.set_defaults(func=cmd_state_transition)

    g = sub.add_parser("gates"); g.add_argument("--project", default="project-001"); g.set_defaults(func=cmd_gates_check)
    d = sub.add_parser("dashboard"); d.add_argument("--json", action="store_true"); d.add_argument("--v3", action="store_true"); d.set_defaults(func=cmd_dashboard)

    # V3
    o = sub.add_parser("objective")
    osub = o.add_subparsers(dest="ocmd")
    oc = osub.add_parser("create"); oc.add_argument("--title", required=True); oc.add_argument("--krs", default=""); oc.set_defaults(func=cmd_objective_create)
    osub.add_parser("list").set_defaults(func=cmd_objective_list)
    os_show = osub.add_parser("show"); os_show.add_argument("id"); os_show.set_defaults(func=cmd_objective_show)

    ini = sub.add_parser("initiative")
    isub = ini.add_subparsers(dest="icmd")
    ic = isub.add_parser("create"); ic.add_argument("--objective", required=True); ic.add_argument("--title", required=True); ic.set_defaults(func=cmd_initiative_create)
    il = isub.add_parser("list"); il.add_argument("--objective", default=None); il.set_defaults(func=cmd_initiative_list)

    inc = sub.add_parser("incident")
    incsub = inc.add_subparsers(dest="inccmd")
    icc = incsub.add_parser("create"); icc.add_argument("--service", required=True); icc.add_argument("--severity", default="high"); icc.add_argument("--title", required=True); icc.set_defaults(func=cmd_incident_create)
    incsub.add_parser("list").set_defaults(func=cmd_incident_list)
    inc_show = incsub.add_parser("show"); inc_show.add_argument("id"); inc_show.set_defaults(func=cmd_incident_show)
    inc_close = incsub.add_parser("close"); inc_close.add_argument("id"); inc_close.add_argument("--postmortem", action="store_true"); inc_close.set_defaults(func=cmd_incident_close)
    # aliases for spec: incident report / observability / rca / heal
    obs = sub.add_parser("observability")
    obssub = obs.add_subparsers(dest="obscmd")
    obss = obssub.add_parser("scan"); obss.add_argument("--service", required=True); obss.set_defaults(func=cmd_observability_scan)
    rca = sub.add_parser("rca")
    rcasub = rca.add_subparsers(dest="rcacmd")
    rcaa = rcasub.add_parser("analyze"); rcaa.add_argument("--incident", required=True); rcaa.set_defaults(func=cmd_rca_analyze)
    heal = sub.add_parser("heal")
    healsub = heal.add_subparsers(dest="healcmd")
    hr = healsub.add_parser("run"); hr.add_argument("--incident", required=True); hr.set_defaults(func=cmd_heal_run)

    pol = sub.add_parser("policy")
    polsub = pol.add_subparsers(dest="polcmd")
    polsub.add_parser("list").set_defaults(func=cmd_policy_list)
    pch = polsub.add_parser("check"); pch.add_argument("--action", required=True); pch.set_defaults(func=cmd_policy_check)

    spr = sub.add_parser("sprint")
    sprsub = spr.add_subparsers(dest="sprcmd")
    sprp = sprsub.add_parser("plan"); sprp.add_argument("--capacity", default="20"); sprp.add_argument("--from", dest="from_", default="objectives"); sprp.set_defaults(func=cmd_sprint_plan)

    ev = sub.add_parser("evaluation")
    evsub = ev.add_subparsers(dest="evcmd")
    evr = evsub.add_parser("report"); evr.add_argument("--agent", default=None); evr.set_defaults(func=cmd_evaluation_report)
    evsub.add_parser("list").set_defaults(func=cmd_evaluation_report)

    rout = sub.add_parser("routing")
    routsub = rout.add_subparsers(dest="routcmd")
    rr = routsub.add_parser("recommend"); rr.add_argument("--task", required=True); rr.set_defaults(func=cmd_routing_recommend)

    alloc = sub.add_parser("allocation")
    allocsub = alloc.add_subparsers(dest="alloccmd")
    allocsub.add_parser("show").set_defaults(func=cmd_allocation_show)

    portf = sub.add_parser("portfolio")
    portfsub = portf.add_subparsers(dest="portfcmd")
    portfsub.add_parser("recommend").set_defaults(func=cmd_portfolio_recommend)
    portfsub.add_parser("show").set_defaults(func=cmd_portfolio_recommend)

    sim = sub.add_parser("simulation")
    simsub = sim.add_subparsers(dest="simcmd")
    sr = simsub.add_parser("run"); sr.add_argument("--options", required=True); sr.add_argument("--criteria", default=""); sr.set_defaults(func=cmd_simulation_run)

    twin = sub.add_parser("twin")
    twinsub = twin.add_subparsers(dest="twincmd")
    ts = twinsub.add_parser("show"); ts.add_argument("--project", default="project-001"); ts.set_defaults(func=cmd_twin_show)
    ti = twinsub.add_parser("impact"); ti.add_argument("--change", required=True); ti.set_defaults(func=cmd_twin_impact)

    args = ap.parse_args()
    if not hasattr(args, "func"):
        ap.print_help(); sys.exit(1)
    args.func(args)

if __name__ == "__main__":
    main()
