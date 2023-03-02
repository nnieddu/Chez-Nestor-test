import { Dialog, Transition } from "@headlessui/react";
import PropertyAdForm from "./PropertyAdForm";
import { PropertyAd } from "../types/propertyAdTypes";

interface ModalProps {
	isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  isEdit : boolean;
	propertyAd?: PropertyAd;
}

const Modal = ({ isModalOpen, setIsModalOpen, isEdit, propertyAd }: ModalProps) => {
  return (
    <Transition.Root show={isModalOpen}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white sm:flex sm:items-start px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Créer votre annonce :
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Veuillez remplir tous les champs ci-dessous :
                    </p>
                    <PropertyAdForm setIsModalOpen={setIsModalOpen} isEdit={isEdit} propertyAd={isEdit ? propertyAd : undefined} />
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
