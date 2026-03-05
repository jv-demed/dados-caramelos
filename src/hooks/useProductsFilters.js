import { useMemo } from "react";

const tagPalette = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "green",
  "cyan",
  "blue",
  "purple",
];

export function useProductsFilters(products, search, tableFilters) {
  const typeFilters = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.type)))
      .sort()
      .map((type) => ({
        text: type,
        value: type,
      }));
  }, [products]);

  const typeColors = useMemo(() => {
    return Object.fromEntries(
      typeFilters.map((t, index) => [
        t.value,
        tagPalette[index % tagPalette.length],
      ])
    );
  }, [typeFilters]);

  const availabilityFilters = [
    { text: "Disponível", value: true },
    { text: "Esgotado", value: false },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType = tableFilters.type
        ? tableFilters.type.includes(product.type)
        : true;

      const matchesAvailability = tableFilters.available
        ? tableFilters.available.includes(product.available)
        : true;

      return matchesSearch && matchesType && matchesAvailability;
    });
  }, [products, search, tableFilters]);

  return {
    typeFilters,
    availabilityFilters,
    filteredProducts,
    typeColors,
  };
}