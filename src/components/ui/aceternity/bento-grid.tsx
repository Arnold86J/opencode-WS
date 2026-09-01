export function BentoGrid({children, className}:{children:React.ReactNode, className?:string}){ return <div className={className}>{children}</div> }
export function BentoCard({title, value, className}:{title:string, value:any, className?:string}){ return <div className={className}><div>{title}</div><div>{value}</div></div> }
