import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-screen opacity-50">
        <CircularProgress color="success" />
    </div>
  )
}
