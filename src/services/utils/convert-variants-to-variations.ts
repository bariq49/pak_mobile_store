// Utility to convert new variants array structure to existing variations format
import { Variant, Variation, VariationsType, VariationOption } from "@/services/types";

/**
 * Convert variants array to variations format for UI compatibility
 * This allows the existing UI components to work with the new variant structure
 */
export function convertVariantsToVariations(variants: Variant[] = []): {
  variations: Variation[];
  variationOptions: VariationOption[];
} {
  if (!variants || variants.length === 0) {
    return { variations: [], variationOptions: [] };
  }

  // Debug: Log variants to see what we're working with
  console.log("Converting variants to variations:", variants);

  // Extract unique attribute values
  const attributeMap: {
    [key: string]: {
      values: Set<string>;
      images: Map<string, string>;
    };
  } = {};

  // Helper to check if image is valid
  const isValidImage = (img: string | undefined): boolean => {
    return !!(img && typeof img === "string" && img.trim() !== "");
  };

  variants.forEach((variant) => {
    // Storage
    if (variant.storage) {
      if (!attributeMap.storage) {
        attributeMap.storage = { values: new Set(), images: new Map() };
      }
      attributeMap.storage.values.add(variant.storage);
      // Set image if valid and not already set, or if current variant has fewer attributes (better match)
      if (isValidImage(variant.image)) {
        const existingImage = attributeMap.storage.images.get(variant.storage);
        if (!existingImage || (!variant.ram && !variant.color)) {
          attributeMap.storage.images.set(variant.storage, variant.image!);
        }
      }
    }

    // RAM
    if (variant.ram) {
      if (!attributeMap.ram) {
        attributeMap.ram = { values: new Set(), images: new Map() };
      }
      attributeMap.ram.values.add(variant.ram);
      // Set image if valid and not already set, or if current variant has fewer attributes
      if (isValidImage(variant.image)) {
        const existingImage = attributeMap.ram.images.get(variant.ram);
        if (!existingImage || (!variant.storage && !variant.color)) {
          attributeMap.ram.images.set(variant.ram, variant.image!);
        }
      }
    }

    // Color - prioritize images for color swatches
    if (variant.color) {
      if (!attributeMap.color) {
        attributeMap.color = { values: new Set(), images: new Map() };
      }
      attributeMap.color.values.add(variant.color);
      // For color, always use the image if available (color swatches need images)
      if (isValidImage(variant.image)) {
        // If image already exists, only replace if current variant has a better match
        // (e.g., if we find a variant with only color selected, prefer that)
        const existingImage = attributeMap.color.images.get(variant.color);
        if (!existingImage || (!variant.storage && !variant.ram)) {
          attributeMap.color.images.set(variant.color, variant.image!);
        }
      }
    }

    // Bundle
    if (variant.bundle) {
      if (!attributeMap.bundle) {
        attributeMap.bundle = { values: new Set(), images: new Map() };
      }
      attributeMap.bundle.values.add(variant.bundle);
    }

    // Warranty
    if (variant.warranty) {
      if (!attributeMap.warranty) {
        attributeMap.warranty = { values: new Set(), images: new Map() };
      }
      attributeMap.warranty.values.add(variant.warranty);
    }
  });

  // Convert to variations format
  const variations: Variation[] = [];
  let attributeIdCounter = 1;
  let valueIdCounter = 1;

  // Determine type based on attribute name
  const getAttributeType = (attrName: string): "swatch" | "radio" | "rectangle" | "rectangleColor" | "swatchImage" | "dropdown" => {
    if (attrName === "color") return "swatchImage"; // Use swatchImage for colors with images
    if (attrName === "storage" || attrName === "ram") return "rectangle";
    if (attrName === "bundle" || attrName === "warranty") return "dropdown";
    return "rectangle";
  };

  Object.entries(attributeMap).forEach(([attrName, attrData]) => {
    const values = Array.from(attrData.values);
    const attributeType = getAttributeType(attrName);

    // Debug: Log images for this attribute
    console.log(`Attribute ${attrName} images:`, Array.from(attrData.images.entries()));

    variations.push({
      id: attributeIdCounter++,
      attribute_id: attributeIdCounter - 1,
      value: values[0] || "",
      attribute: {
        _id: attributeIdCounter - 1,
        id: attributeIdCounter - 1,
        slug: attrName,
        name: attrName.charAt(0).toUpperCase() + attrName.slice(1),
        type: attributeType,
        values: values.map((value, index) => {
          const image = attrData.images.get(value);
          // Ensure image is a valid URL string
          const imageUrl = image && typeof image === "string" && image.trim() !== "" 
            ? image.trim() 
            : undefined;
          
          // Debug: Log each value and its image
          console.log(`  Value "${value}" for ${attrName}: image =`, imageUrl);
          
          return {
            _id: valueIdCounter++,
            id: valueIdCounter - 1,
            attribute_id: attributeIdCounter - 1,
            value: value,
            image: imageUrl,
          };
        }),
      },
    });
  });

  // Convert variants to variation_options format
  const variationOptions: VariationOption[] = variants.map((variant, index) => {
    const attributes: any[] = [];
    
    if (variant.storage) {
      attributes.push({ name: "storage", value: variant.storage });
    }
    if (variant.ram) {
      attributes.push({ name: "ram", value: variant.ram });
    }
    if (variant.color) {
      attributes.push({ name: "color", value: variant.color });
    }
    if (variant.bundle) {
      attributes.push({ name: "bundle", value: variant.bundle });
    }
    if (variant.warranty) {
      attributes.push({ name: "warranty", value: variant.warranty });
    }

    return {
      id: index + 1,
      attributes,
      title: attributes.map((attr) => attr.value).join(" - ") || "Default",
      price: variant.price || 0,
      sale_price: variant.price || 0, // Use price as sale_price if no separate sale price
      quantity: variant.stock || 0,
      is_disable: variant.stock <= 0 ? 1 : 0,
      image: variant.image && variant.image.trim() !== ""
        ? {
            id: index + 1,
            thumbnail: variant.image,
            original: variant.image,
            original2: variant.image,
          }
        : {
            id: index + 1,
            thumbnail: "",
            original: "",
            original2: "",
          },
      sku: variant.sku || "",
      options: attributes,
    };
  });

  return { variations, variationOptions };
}

/**
 * Convert variants to VariationsType format (for UI components)
 */
export function convertVariantsToVariationsType(variants: Variant[] = []): VariationsType {
  if (!variants || variants.length === 0) {
    return {};
  }

  const { variations } = convertVariantsToVariations(variants);
  const variationsType: VariationsType = {};

  variations.forEach((variation) => {
    const slug = variation.attribute.slug;
    variationsType[slug] = {
      type: variation.attribute.type,
      options: variation.attribute.values.map((val) => {
        // Ensure image is properly formatted
        const imageUrl = val.image && typeof val.image === "string" && val.image.trim() !== ""
          ? val.image.trim()
          : "";
        return {
          id: val.id,
          attribute_id: val.attribute_id,
          value: val.value,
          image: imageUrl,
        };
      }),
    };
  });

  return variationsType;
}

/**
 * Find matching variant based on selected attributes
 */
export function findMatchingVariant(
  variants: Variant[],
  attributes: { [key: string]: string }
): Variant | null {
  if (!variants || variants.length === 0) return null;

  return (
    variants.find((variant) => {
      const matchesStorage = !attributes.storage || variant.storage === attributes.storage;
      const matchesRam = !attributes.ram || variant.ram === attributes.ram;
      const matchesColor = !attributes.color || variant.color === attributes.color;
      const matchesBundle = !attributes.bundle || variant.bundle === attributes.bundle;
      const matchesWarranty = !attributes.warranty || variant.warranty === attributes.warranty;

      return (
        matchesStorage &&
        matchesRam &&
        matchesColor &&
        matchesBundle &&
        matchesWarranty
      );
    }) || null
  );
}

