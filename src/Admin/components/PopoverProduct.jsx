import React from "react";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import trashIcon from "../../Assets/trash-icon.png";
import editIcon from "../../Assets/edit-icon.png";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import { toast } from "react-toastify";

function PopoverProduct(props) {
  const { openModalEditOptions, id, setEditId, getProducts } = props;

  const deleteSubmit = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/delete-product?id=${id}`);
      toast.success(`Produk berhasil dihapus`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // const { openModalEditOptions, id, setEditId } = props;
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className="btn-plain rounded-full h-8 aspect-square border flex justify-center items-center border-primary/20 hover:bg-primary/20">
            <DotsVerticalIcon className="h-5" />
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <Popover.Panel
                as={motion.div}
                static
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, type: "tween" }}
                className="absolute right-9 -top-2 z-10 bg-putih rounded focus:outline-none shadow-xl shadow-black/20 overflow-hidden bg-white flex p-2 gap-x-2"
              >
                <button
                  className="btn-plain rounded-full h-8 aspect-square border flex justify-center items-center border-primary/20 hover:bg-primary/20"
                  onClick={() => {
                    close();
                    setEditId(id);
                    openModalEditOptions();
                  }}
                >
                  <img src={editIcon} alt="" className="h-4" />
                </button>
                <button
                  className="btn-plain rounded-full h-8 aspect-square border flex justify-center items-center border-primary/20 hover:bg-primary/20"
                  onClick={() => {
                    deleteSubmit(id);
                  }}
                >
                  <img src={trashIcon} alt="" className="h-5" />
                </button>
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}

export default PopoverProduct;
