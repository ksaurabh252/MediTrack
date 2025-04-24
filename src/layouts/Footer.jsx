import { useNavigate } from 'react-router-dom';

const Footer = ({ darkMode }) => {
  const navigate = useNavigate();

  return (
    <footer className={`py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div
            className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="font-bold">MediTrack</span>
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} MediTrack. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};



export default Footer;