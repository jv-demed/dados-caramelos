"use client";
import { useEffect, useState } from "react";
import { Modal, Button, Input, Checkbox, Select } from "antd";

import {
  createEmptyProduct,
  createProduct,
  updateProduct,
} from "@/services/productsService";

import { ProductType } from "@/models/ProductType";
import { ProductMaterial } from "@/models/ProductMaterial";

import { SelectInput } from "@/components/inputs/SelectInput";

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

  function formatCurrencyBRL(value) {
    if (value === null || value === undefined) return "";

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function parseCurrencyToNumber(value) {
    if (!value) return 0;

    const onlyNumbers = value.replace(/\D/g, "");
    return Number(onlyNumbers) / 100;
  }

  return (
    <Modal
      open={open}
      title={product?.id ? "Editar Produto" : "Novo Produto"}
      onCancel={onClose}
      width={600}
      destroyOnHidden
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={onSave}>
          Salvar
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-4 mt-4">
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
        <div>
          <label className="block mb-1 font-medium">Categoria</label>
          <Select
            className="w-full"
            value={productModel?.type}
            onChange={(value) =>
              setProductModel({
                ...productModel,
                type: value,
              })
            }
            options={ProductType.options()}
            placeholder="Selecione uma categoria"
          />
        </div>
        {productModel?.type === ProductType.CAMISETA && (
          <div>
            <label className="block mb-1 font-medium">Material</label>

            <Select
              className="w-full"
              value={productModel?.material}
              onChange={(value) =>
                setProductModel({
                  ...productModel,
                  material: value,
                })
              }
              options={ProductMaterial.options()}
              placeholder="Selecione o material"
            />
          </div>
        )}
        <div className="flex gap-4 items-end">
          <div>
            <label className="block mb-1 font-medium">Preço</label>
            <Input
              value={formatCurrencyBRL(productModel?.price)}
              onChange={(e) => {
                const numericValue = parseCurrencyToNumber(e.target.value);

                setProductModel({
                  ...productModel,
                  price: numericValue,
                });
              }}
              placeholder="R$ 0,00"
              inputMode="numeric"
            />
          </div>
          <div className="flex items-center h-fit">
            <Checkbox
              checked={productModel?.available}
              onChange={(e) =>
                setProductModel({
                  ...productModel,
                  available: e.target.checked,
                })
              }
            >
              Disponível
            </Checkbox>
          </div>
        </div>
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
