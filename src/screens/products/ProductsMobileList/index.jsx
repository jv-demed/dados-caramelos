import { Switch, Tag, Image, Dropdown, Card } from "antd";
import { MoreVertical } from "lucide-react";

export function ProductsMobileList({ products, typeColors }) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {products.map((item) => (
        <Card key={item.id} styles={{ body: { padding: 16 } }}>
          <div className="flex gap-4">
            <Image
              src={item.img_link}
              alt={item.name}
              width={80}
              height={80}
              style={{
                objectFit: "cover",
                borderRadius: 8,
              }}
              preview={false}
            />

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <Tag color={typeColors[item.type] || "default"}>
                    {item.type}
                  </Tag>

                  <p className="mt-2">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.material || "-"}
                  </p>
                </div>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "edit",
                        label: "Editar",
                        onClick: () => handleOpenEditModal(item),
                      },
                      {
                        key: "delete",
                        label: "Excluir",
                        danger: true,
                        onClick: () => handleOpenDeleteModal(item),
                      },
                    ],
                  }}
                >
                  <MoreVertical size={18} />
                </Dropdown>
              </div>

              <div className="mt-3">
                <Switch
                  checked={item.available}
                  checkedChildren="Disponível"
                  unCheckedChildren="Esgotado"
                  onChange={() => toggleProductAvailability(item)}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
