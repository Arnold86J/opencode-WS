import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def run(*args):
    r = subprocess.run([sys.executable, str(ROOT/"tools"/"wf.py"), *args], capture_output=True, text=True)
    return r

def test_factory_status():
    r = run("factory", "status")
    assert r.returncode == 0, r.stderr
    j = json.loads(r.stdout)
    assert j["factory"] == "ai-software-factory"
    assert "projects" in j

def test_task_graph():
    r = run("task", "graph", "--project", "project-001")
    assert r.returncode == 0
    assert "TASK-001" in r.stdout
    assert "TASK-045" in r.stdout

def test_task_ready():
    r = run("task", "ready", "--project", "project-001")
    assert r.returncode == 0
    j = json.loads(r.stdout)
    assert any(t["task_id"]=="TASK-001" for t in j), "TASK-001 should be READY"

def test_state_show():
    r = run("state", "show", "--project", "project-001")
    assert r.returncode == 0
    assert "IDEATION" in r.stdout

def test_state_transition_blocked_by_gate():
    r = run("state", "transition", "--project", "project-001", "--to", "DEVELOPMENT")
    assert r.returncode != 0
    assert "Gate" in r.stderr

def test_gates():
    r = run("gates", "--project", "project-001")
    assert r.returncode == 0
    assert "product" in r.stdout

# V3 tests
def test_objective_list():
    r = run("objective", "list")
    assert r.returncode == 0, r.stderr
    assert "OBJ-001" in r.stdout

def test_objective_show():
    r = run("objective", "show", "OBJ-001")
    assert r.returncode == 0
    j = json.loads(r.stdout)
    assert j["objective_id"] == "OBJ-001"
    assert len(j["key_results"]) == 4

def test_initiative_list():
    r = run("initiative", "list", "--objective", "OBJ-001")
    assert r.returncode == 0
    assert "INIT-001" in r.stdout

def test_incident_list():
    r = run("incident", "list")
    assert r.returncode == 0
    assert "INC-1042" in r.stdout

def test_rca_analyze():
    r = run("rca", "analyze", "--incident", "INC-1042")
    assert r.returncode == 0
    j = json.loads(r.stdout)
    assert "root_cause" in j
    assert j["confidence"] == 0.87

def test_policy_check():
    r = run("policy", "check", "--action", "production_deployment")
    assert r.returncode == 0
    assert "tests_passed" in r.stdout

def test_portfolio_recommend():
    r = run("portfolio", "recommend")
    assert r.returncode == 0
    assert "Continue" in r.stdout or "Accelerate" in r.stdout

def test_simulation_run():
    r = run("simulation", "run", "--options", "monolith,microservices,modular")
    assert r.returncode == 0
    assert "modular" in r.stdout.lower()

def test_dashboard_v3():
    r = run("dashboard", "--v3")
    assert r.returncode == 0
    assert "Autonomous Loop" in r.stdout

def test_evaluation_report():
    r = run("evaluation", "report", "--agent", "frontend")
    assert r.returncode == 0
    j = json.loads(r.stdout)
    assert j["agent"] == "frontend"
    assert j["quality"] == 9.1

if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            try:
                fn()
                print(f"PASS {name}")
            except AssertionError as e:
                print(f"FAIL {name}: {e}")
                print("STDOUT:", run.__doc__)
                sys.exit(1)
    print("All tests PASS")
