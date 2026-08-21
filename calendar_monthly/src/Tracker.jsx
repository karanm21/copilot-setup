import React, {useEffect, useMemo, useState} from 'react'

const HABITS_KEY = 'habits'
const ENTRY_PREFIX = 'entries-'

function pctToColor(pct){
  // interpolate HSL: gold ~ 45deg to pine green ~ 140deg
  const hue = 45 + (140-45) * pct
  const sat = 60 + (80-60)*pct
  const light = 60 - (30*pct)
  return `hsl(${hue} ${sat}% ${light}%)`
}

function daysInMonth(year, month){
  return new Date(year, month+1, 0).getDate()
}

function loadHabits(){
  try{ const raw = localStorage.getItem(HABITS_KEY); return raw?JSON.parse(raw):[] }catch(e){return []}
}
function saveHabits(h){ localStorage.setItem(HABITS_KEY, JSON.stringify(h)) }

function loadEntries(key){
  try{ const raw = localStorage.getItem(key); return raw?JSON.parse(raw):{} }catch(e){return {}}
}
function saveEntries(key, entries){ localStorage.setItem(key, JSON.stringify(entries)) }

export default function Tracker(){
  const now = new Date()
  const [yearMonth, setYearMonth] = useState(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`)
  const [habits, setHabits] = useState(loadHabits)
  const entriesKey = useMemo(()=> ENTRY_PREFIX + yearMonth, [yearMonth])
  const [entries, setEntries] = useState(()=> loadEntries(entriesKey))
  const [newHabit, setNewHabit] = useState('')

  useEffect(()=>{ saveHabits(habits) }, [habits])
  useEffect(()=>{ const e = loadEntries(entriesKey); setEntries(e) }, [entriesKey])
  useEffect(()=>{ saveEntries(entriesKey, entries) }, [entriesKey, entries])

  const [year, month] = yearMonth.split('-').map(Number)
  const dim = daysInMonth(year, month-1)

  function addHabit(){ if(!newHabit.trim()) return; const h={id:Date.now().toString(36),name:newHabit.trim()}; setHabits(s=>[...s,h]); setNewHabit('') }
  function removeHabit(id){ if(!confirm('Remove habit?')) return; setHabits(s=>s.filter(h=>h.id!==id)); const copy={...entries}; delete copy[id]; setEntries(copy) }

  function setDay(habitId, day, pct){
    setEntries(e=>{ const c = {...e}; c[habitId]=c[habitId]||{}; if(pct===null) delete c[habitId][day]; else c[habitId][day]=pct; return c })
  }

  function exportCSV(){
    const header = ['Habit', ...Array.from({length:dim},(_,i)=>String(i+1)), 'Average']
    const rows = habits.map(h=>{
      const row = [h.name]
      const vals = entries[h.id]||{}
      let sum=0, count=0
      for(let d=1; d<=dim; d++){
        const v = vals[d]
        row.push(v==null? '': v+'%')
        if(v!=null){ sum+=v; count++ }
      }
      row.push(count? Math.round(sum/count)+'%': '')
      return row
    })
    const csv = [header, ...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], {type:'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download = `${yearMonth}.csv`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
  }

  return (
    <div className="tracker-root" style={{background:'#EAE3D3',color:'#2B2A24',minHeight:'100vh',padding:24,fontFamily:'Inter,system-ui'}}>
      <div className="header" style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
        <button onClick={()=>{ const [y,m]=yearMonth.split('-').map(Number); const d=new Date(y,m-1-1,1); setYearMonth(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`)}}>◀</button>
        <div style={{fontFamily:'Fraunces,serif',fontSize:20}}>{new Date(year,month-1).toLocaleString(undefined,{month:'long',year:'numeric'})}</div>
        <button onClick={()=>{ const [y,m]=yearMonth.split('-').map(Number); const d=new Date(y,m,1); setYearMonth(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`)}}>▶</button>
        <input type="month" value={yearMonth} onChange={e=>setYearMonth(e.target.value)} style={{marginLeft:12}} />
        <div style={{marginLeft:'auto',display:'flex',gap:8}}>
          <button onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
        <input placeholder="Add habit" value={newHabit} onChange={e=>setNewHabit(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addHabit()} />
        <button onClick={addHabit}>Add habit</button>
      </div>

      <div className="table-wrap" style={{overflowX:'auto'}}>
        <table className="tracker-table" style={{borderCollapse:'collapse',minWidth:800,border:`1px solid #C9C0A8`}}>
          <thead>
            <tr>
              <th style={{position:'sticky',left:0,background:'#EAE3D3',zIndex:3,borderRight:`1px solid #C9C0A8`}}>Habit</th>
              {Array.from({length:dim},(_,i)=>i+1).map(d=> <th key={d}>{d}</th>)}
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {habits.map(h=>{
              const vals = entries[h.id]||{}
              let sum=0,count=0
              for(let d=1; d<=dim; d++){ const v=vals[d]; if(v!=null){ sum+=v; count++ }}
              const avg = count? Math.round(sum/count): ''
              return (
                <tr key={h.id}>
                  <td style={{position:'sticky',left:0,background:'#fff',zIndex:2,borderRight:`1px solid #C9C0A8`,padding:8,display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontFamily:'Fraunces,serif'}}>{h.name}</span>
                    <button onClick={()=>removeHabit(h.id)}>×</button>
                  </td>
                  {Array.from({length:dim},(_,i)=>{
                    const day = i+1
                    const v = vals[day]
                    return (
                      <td key={day} style={{padding:6,textAlign:'center'}}>
                        <div onClick={()=>{
                          // open simple prompt popover — for brevity use prompt()
                          const vstr = prompt('Enter value 0,25,50,75,100 or blank to clear', v==null? '': String(v))
                          if(vstr===null) return
                          const parsed = vstr === ''? null : parseInt(vstr,10)
                          if(parsed==null || [0,25,50,75,100].includes(parsed)) setDay(h.id, day, parsed)
                          else alert('Invalid value')
                        }}
                          style={{width:28,height:28,display:'inline-block',borderRadius:14, border:v==null? '2px dashed #C9C0A8' : 'none', background: v==null? 'transparent' : pctToColor(v/100)}} />
                      </td>
                    )
                  })}
                  <td style={{textAlign:'center',fontFamily:'IBM Plex Mono'}}>{avg===''? '' : `${avg}%`}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td style={{position:'sticky',left:0,background:'#EAE3D3',borderRight:`1px solid #C9C0A8`}}>Daily average</td>
              {Array.from({length:dim},(_,i)=>{
                const day=i+1
                let sum=0,count=0
                habits.forEach(h=>{ const v=(entries[h.id]||{})[day]; if(v!=null){sum+=v;count++}})
                const avg = count? Math.round(sum/count): ''
                return <td key={day} style={{textAlign:'center',fontFamily:'IBM Plex Mono'}}>{avg===''? '' : `${avg}%`}</td>
              })}
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
