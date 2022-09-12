
import './BaseModal.css'
import { CSSTransition  } from 'react-transition-group';

interface BaseModalProps {
  children: React.ReactNode;
  activeModal: Boolean | null;
  onToggleModal: () => void;
  classes: string;
}

const BaseModal: React.FC<BaseModalProps> = ({ children, activeModal, onToggleModal, classes }) => {
  
  return (
      <CSSTransition
        in={true}
        timeout={400}
        classNames="modal-inner"
        unmountOnExit
      >
      <div className="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
      
        <div className="p-4 bg-white self-start mt-32 max-w-screen-md">
     
      
        <div className="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
          <div className="p-4 bg-white self-start mt-32 max-w-screen-md ">
            {children}

            <button 
              className="text-white mt-8 bg-weather-primary py-2 px-6"
              onClick={onToggleModal}
            >
              Close
            </button>
          </div>
          
        </div>
     
    </div>
    
    
  </div>
    </CSSTransition>
  )
}

export default BaseModal