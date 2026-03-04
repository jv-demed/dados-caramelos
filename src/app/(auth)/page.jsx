"use client";
import { useState } from "react";
import { useDataList } from "@/hooks/useDataList";

import {
  Switch,
  Tag,
  Image,
  Dropdown,
  Table,
  Empty,
  Input,
  Button,
  Modal,
} from "antd";
import { MoreVertical } from "lucide-react";
import { ProductForm } from "@/screens/products/ProductModal";
import { deleteProduct } from "@/services/productsService";

const { Search } = Input;

export default function Home() {
  const products = useDataList({ table: "products" });

  const [search, setSearch] = useState("");
  const [tableFilters, setTableFilters] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const typeFilters = Array.from(new Set(products.list.map((p) => p.type)))
    .sort()
    .map((type) => ({
      text: type,
      value: type,
    }));

  const availabilityFilters = [
    { text: "Disponível", value: true },
    { text: "Esgotado", value: false },
  ];

  const columns = [
    {
      title: "Imagem",
      dataIndex: "img_link",
      key: "img",
      render: (img, record) => (
        <Image
          src={img}
          alt={record.name}
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: 8 }}
          preview={false}
        />
      ),
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      filters: typeFilters,
      filteredValue: tableFilters.type || null,
      onFilter: (value, record) => record.type === value,
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      filteredValue: search ? [search] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `R$ ${price.toFixed(2).replace(".", ",")}`,
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      render: (material) => (material ? material : "-"),
    },
    {
      title: "Disponível",
      dataIndex: "available",
      key: "available",
      filters: availabilityFilters,
      filteredValue: tableFilters.available || null,
      onFilter: (value, record) => record.available === value,
      render: (available, record) => (
        <Switch
          checked={available}
          checkedChildren="Disponível"
          unCheckedChildren="Esgotado"
          onChange={(checked) => {
            console.log("Alterar disponibilidade:", record.id, checked);
          }}
        />
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Editar",
                onClick: () => handleOpenEditModal(record),
              },
              {
                key: "delete",
                label: "Excluir",
                danger: true,
                onClick: () => confirmDelete(record),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreVertical size={18} style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  function handleOpenCreateModal() {
    setSelectedProduct(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }

  function confirmDelete(product) {
    Modal.confirm({
      title: "Confirmar exclusão",
      content: (
        <>
          Você realmente deseja excluir o produto{" "}
          <strong>{product.name}</strong>? Essa ação não poderá ser desfeita.
        </>
      ),
      okText: "Excluir",
      okType: "danger",
      cancelText: "Cancelar",
      centered: true,
      async onOk() {
        const result = await deleteProduct(product);
        if (!result) return;

        products.refresh();
      },
    });
  }

  return (
    <>
      <ProductForm
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={products.refresh}
        product={selectedProduct}
      />
      <h1 className="text-2xl font-semibold">Produtos</h1>
      <div className="w-full flex gap-8">
        <Search
          placeholder="Buscar produto pelo nome"
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleOpenCreateModal}>Adicionar Produto</Button>
      </div>
      <Table
        rowKey="id"
        dataSource={products.list}
        columns={columns}
        loading={products.loading}
        pagination={{ pageSize: 10 }}
        onChange={(_, filters) => {
          setTableFilters(filters);
        }}
        locale={{
          emptyText: <Empty description="Nenhum produto encontrado" />,
        }}
        className="w-full"
      />
    </>
  );
}
