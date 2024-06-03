function Error({ children }) {

  const errorValidate = typeof children === 'string' ? children : 'Error'

  return (
      <div className="text-center my-4 bg-red-600 text-white p-3 uppercase">
          {errorValidate}
      </div>
  )
}

export default Error