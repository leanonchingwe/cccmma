import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Layout.module.css';

export function GradientBackground({ variant, className }) {
  const classes = classNames(
    {
      [styles.colorBackground]: variant === 'large',
      [styles.colorBackgroundBottom]: variant === 'small',
    },
    className
  );

  return <div className={classes} />;
}

export default function Layout({ children }) {
  const setAppTheme = () => {
    const darkMode = localStorage.getItem('theme') === 'dark';
    const lightMode = localStorage.getItem('theme') === 'light';

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else if (lightMode) {
      document.documentElement.classList.remove('dark');
    }
    return;
  };

  const handleSystemThemeChange = () => {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.onchange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
  };

  useEffect(() => {
    setAppTheme();
  }, []);

  useEffect(() => {
    handleSystemThemeChange();
  }, []);

  return (
    <div className="relative pb-24 overflow-hidden">
      {/* Financial News Section */}
      <section className="bg-white py-10">
        <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
          <h2 className="text-2xl font-bold mb-6">Financial News Section</h2>
          {/* Add your financial news content here */}
        </div>
      </section>

      {/* Stock Information Section */}
      <section className="bg-gray-100 py-10">
        <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
          <h2 className="text-2xl font-bold mb-6">Stock Information Section</h2>
          {/* Add your stock information content here */}
        </div>
      </section>

      {/* Financial Insights Section */}
      <section className="bg-white py-10">
        <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
          <h2 className="text-2xl font-bold mb-6">Financial Insights Section</h2>
          {/* Add your financial insights content here */}
        </div>
      </section>

      {/* Other Sections */}
      {children}
    </div>
  );
}
