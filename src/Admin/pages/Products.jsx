import React, { useState } from "react";
import AddMedicineModal from "../components/AddMedicineModal";

function Products() {
  const [addMedicineModal, setAddMedicineModal] = useState(false);
  return (
    <>
      {addMedicineModal && (
        <AddMedicineModal
          addMedicineModal={addMedicineModal}
          setAddMedicineModal={setAddMedicineModal}
        />
      )}

      <div className="bg-red-500 h-screen w-full justify-center flex">
        <div className="bg-green-700 w-screen pt-16 pl-64">
          <div className="py-8 px-12">
            <div className="flex mb-9">
              <div>Daftar Obat</div>
              <div className="flex justify-end w-full">
                <div>Daftar Obat</div>
                <div>Daftar Obat</div>
              </div>
            </div>
            <div className="bg-white w-full h-[800px]">
              <div className="pt-8">
                <div className="bg-green-300 w-full flex">
                  <div>Cari nama Obat</div>
                  <div>Filter</div>
                  <div className="flex justify-end w-full">
                    <button
                      onClick={() => {
                        setAddMedicineModal(true);
                      }}
                    >
                      Tambah obat
                    </button>
                  </div>
                </div>
                <div className="pt-9">
                  <div className="flex justify-center">baris</div>
                </div>
                <div className="w-full h-[628px] bg-red-400 mt-8">
                  <div className="flex justify-center pt-72">Table</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
