import React, { useContext } from 'react'
import { dateSelectedContext } from '../../useContext/context'
import TrashIcon from '../../assets/icons/trash'

const Filter = () => {
  const {month ,setMonth ,year, setYear} = useContext(dateSelectedContext)
  
  const shiftMonth = (value) => {
    if(month + value >= 12 ){
      setYear(year + parseInt((month + value)/11))
      setMonth((month + value) % 12)
    }else if(month + value === -1 ){
      setYear(year - 1)
      setMonth(11)
    }else {
      setMonth(month + value)
    }
  }

  const deleteAllCustomsAppointments = () => {
    window.sessionStorage.clear()
    alert('All the Custom Appointments were removed')
    window.location.reload()
  }
  return (
    <div className='flex gap-3 justify-between'>
      <div>
        <button onClick={()=> shiftMonth(-1)} className=' transition-all hover:bg-palette5 hover:bg-opacity-10 px-3 py-2 active:bg-opacity-65 rounded-sm font-bold'>Back</button>
        <button onClick={()=> shiftMonth(+1)} className=' transition-all hover:bg-palette5 hover:bg-opacity-10 px-3 py-2 active:bg-opacity-65 rounded-sm font-bold'>Next</button>
      </div>
        <div onClick={deleteAllCustomsAppointments} className='bg-palette4 p-2 cursor-pointer hover:scale-105 transition-all hover:rounded-md'><TrashIcon/></div>
    </div>
  )
}

export default Filter