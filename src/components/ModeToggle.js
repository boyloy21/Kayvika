// 'use client';

// import * as React from 'react';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useTheme } from 'next-themes';
// import { Dropdown } from 'react-bootstrap';

// export function ModeToggle() {
//   const { setTheme } = useTheme();

//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
//         <i className="bi bi-moon-stars-fill"></i>
//         <i className="bi bi-sun-fill ml-2"></i>
//         <span className="sr-only">Toggle theme</span>
//       </Dropdown.Toggle>

//       <Dropdown.Menu align="end">
//         <Dropdown.Item onClick={() => setTheme('light')}>
//           Light
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => setTheme('dark')}>
//           Dark
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => setTheme('system')}>
//           System
//         </Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until the component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-3">
      <span className="text-xl">
        {theme === 'dark' ? (
          <i className="bi bi-moon-stars-fill"></i>

        ) : (
          <i className="bi bi-sun-fill"></i>
        )}
      </span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={theme === 'dark'} 
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} 
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
      {/* Display the current mode */}
      {/* <p className="text-md">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </p> */}
    </div>
  );
}
