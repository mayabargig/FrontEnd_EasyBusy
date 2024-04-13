import React from 'react'
import useTheme from './Theme'

export default function ThemeBtn() {
    const{themeMode, darkTheme, lightTheme}= useTheme();

    const onChangeBtn = (e) =>{
        const darkModeStatus = e.currentTarget.checked;
        if(darkModeStatus){
            darkTheme()
        }else{
            lightTheme()
        }
    }


  return (
<div className="flex flex-col justify-center ml-3">

  <label style={{margin:"0.5rem", padding:"0", width:"2rem", height:"2rem"}} className='relative inline-flex items-center cursor-pointer'>
    <input
    type='checkbox'
    value=""
    className='sr-only peer'
    onChange={onChangeBtn}
    checked={themeMode === 'dark'}
    /> 
     <svg className="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
            <path className="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
        </svg>
        <svg className="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
            <path className="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
        </svg>
    {/* <div className="absolute left-10 bottom-0 w-11 h-6 bg-gray-200 
    peer-focus:outline-none peer-focus:ring-4
    peer-focus:ring-blue-300
    dark:peer-focus:ring-blue-800 rounded-full peer
    dark:bg-gray-700
    peer-checked:after:translate-x-full
    peer-checked:after:border-white after:content-
    [''] after:absolute after:top-[2px] after:left-
    [-2px] after:bg-white after:border-gray-300
    after:border after:rounded-full after:h-5
    after:w-5 after:transition-all
    dark:border-gray-600 peer-checked:bg-blue-600"></div>  */}
    <span className="ml-3 text-sm font-medium
    text-gray-900"></span>
  </label>
</div>
  )
}
