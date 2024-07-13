
interface props{
    children: React.ReactNode
}
export default function CenteredPage(props:props) {
  return (
    <div className='flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
        {props.children}
    </div>
  )
}
