interface checkDateRangeProps {
  initialDate: string;
  finalDate: string;
}

const checkDateRange = ({ initialDate, finalDate }: checkDateRangeProps) => {
  let today = new Date()

  const [initialDay, initialMonth, initialYear] = initialDate.split('/')
  const [finalDay, finalMonth, finalYear] = finalDate.split('/')
  
  let initial = new Date(parseInt(initialYear), parseInt(initialMonth) - 1, parseInt(initialDay))
  let final = new Date(parseInt(finalYear), parseInt(finalMonth) - 1, parseInt(finalDay), 23,59,59)
  
  // console.log('Test', 'Today: '+ today + ', Initial date: '+ initial + ', Final Date: ' + final);
  // console.log('Test', 'Today: '+ today.getTime() + ', Initial date: '+ initial.getTime() + ', Final Date: ' + final.getTime());

  // console.log("isNaN - Initial", !isNaN(initial.getTime()))
  // console.log("isNaN - Final", !isNaN(final.getTime()))

  if(!isNaN(initial.getTime()) && !isNaN(final.getTime()))
    return (today >= initial && today < final)
  
  return "Invalid Date"

  
};

export default checkDateRange;
