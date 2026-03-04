"use client";
import { useEffect, useState } from "react";
import { Modal, Button, Input } from "antd";

import {
  createEmptyProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/services/productsService";

import { ProductType } from "@/models/ProductType";
import { ProductMaterial } from "@/models/ProductMaterial";

import { MoneyInput } from "@/components/inputs/MoneyInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { CheckboxInput } from "@/components/inputs/CheckboxInput";

export function ProductForm({ open, onClose, onSuccess, product }) {
  const [productModel, setProductModel] = useState(createEmptyProduct());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductModel(product ? { ...product } : createEmptyProduct());
  }, [product]);

  async function onSave() {
    setLoading(true);

    const result = product?.id
      ? await updateProduct(productModel)
      : await createProduct(productModel);

    setLoading(false);

    if (!result) return;

    await onSuccess();
    onClose();
  }

  async function onDelete() {
    setLoading(true);

    const result = await deleteProduct(productModel);

    setLoading(false);

    if (!result) return;

    await onSuccess();
    onClose();
  }

  return (
    <Modal
      open={open}
      title={product?.id ? "Editar Produto" : "Novo Produto"}
      onCancel={onClose}
      width={600}
      destroyOnHidden
      footer={[
        product?.id && (
          <Button key="delete" danger onClick={onDelete} loading={loading}>
            Excluir
          </Button>
        ),
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={onSave}>
          Salvar
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-4 mt-4">
        {/* Nome */}
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <Input
            value={productModel?.name}
            onChange={(e) =>
              setProductModel({ ...productModel, name: e.target.value })
            }
            placeholder="Digite o nome do produto"
          />
        </div>

        {/* Categoria */}
        <SelectInput
          title="Categoria"
          value={ProductType.toUpper(productModel?.type)}
          setValue={(e) => setProductModel({ ...productModel, type: e })}
          options={ProductType.options()}
        />

        {/* Material */}
        <SelectInput
          title="Material"
          value={ProductMaterial.toUpper(productModel?.material)}
          setValue={(e) => setProductModel({ ...productModel, material: e })}
          options={ProductMaterial.options()}
          isVisible={
            ProductType.toUpper(productModel?.type) === ProductType.CAMISETA
          }
        />

        <div className="flex gap-4">
          <MoneyInput
            title="Preço"
            value={productModel?.price}
            setValue={(e) => setProductModel({ ...productModel, price: e })}
          />

          <div className="flex items-end pb-2">
            <CheckboxInput
              title="Disponível"
              value={productModel?.available}
              setValue={(e) =>
                setProductModel({ ...productModel, available: e })
              }
            />
          </div>
        </div>

        {/* Link da Imagem */}
        <div>
          <label className="block mb-1 font-medium">Link da Imagem</label>
          <Input
            value={productModel?.img_link}
            onChange={(e) =>
              setProductModel({
                ...productModel,
                img_link: e.target.value,
              })
            }
            placeholder="https://..."
          />
        </div>
      </div>
    </Modal>
  );
}
