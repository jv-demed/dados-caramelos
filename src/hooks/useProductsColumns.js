import { Image, Tag, Switch, Dropdown } from "antd";
import { MoreVertical } from "lucide-react";

export function useProductsColumns({
  typeFilters,
  availabilityFilters,
  typeColors,
  onEdit,
  onDelete,
  onToggleAvailability,
}) {
  return [
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
      onFilter: (value, record) => record.type === value,
      render: (type) => (
        <Tag color={typeColors[type] || "default"}>
          {type}
        </Tag>
      ),
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) =>
        `R$ ${price.toFixed(2).replace(".", ",")}`,
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      render: (material) => material || "-",
    },
    {
      title: "Disponível",
      dataIndex: "available",
      key: "available",
      filters: availabilityFilters,
      onFilter: (value, record) =>
        record.available === value,
      render: (available, record) => (
        <Switch
          checked={available}
          checkedChildren="Disponível"
          unCheckedChildren="Esgotado"
          onChange={() => onToggleAvailability(record)}
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
                onClick: () => onEdit(record),
              },
              {
                key: "delete",
                label: "Excluir",
                danger: true,
                onClick: () => onDelete(record),
              },
            ],
          }}
        >
          <MoreVertical size={18} />
        </Dropdown>
      ),
    },
  ];
}