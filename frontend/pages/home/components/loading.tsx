const Loading =()=>{
    return <div>
    <div className="bg-blue-300 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-400 outline-none focus:outline-none">
          <div className="relative p-6 flex-auto items-center">
            <p className="text-2xl font-bold whitespace-nowrap dark:text-white">LOADING...</p>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
</div>
}

export default Loading