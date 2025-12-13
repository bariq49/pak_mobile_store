import { useMemo, useState, useEffect } from "react";
import { Product, Variation, VariationOption } from "@/services/types";
import { isEqual } from "lodash";
import { getVariations } from "@/services/utils/get-variations";
import {
  convertVariantsToVariations,
  convertVariantsToVariationsType,
  findMatchingVariant,
} from "@/services/utils/convert-variants-to-variations";

function useProductVariations(
  product?: Product,
  useVariations?: Variation[],
  attributes: { [key: string]: string } = {}
) {
  // Check if product uses new variants structure or old variations structure
  const hasNewVariants = product?.variants && Array.isArray(product.variants) && product.variants.length > 0;
  const hasOldVariations = product?.variations && Array.isArray(product.variations) && product.variations.length > 0;

  // Get product main image as fallback for variants
  const productMainImage = useMemo(() => {
    if (product?.image && typeof product.image === "object") {
      return (product.image as any).thumbnail || (product.image as any).original || "";
    }
    if (product?.mainImage && typeof product.mainImage === "string") {
      return product.mainImage;
    }
    return "";
  }, [product?.image, product?.mainImage]);

  // Convert new variants structure to old format if needed
  const convertedData = useMemo(() => {
    if (hasNewVariants) {
      return convertVariantsToVariations(product.variants || [], productMainImage);
    }
    return { variations: [], variationOptions: [] };
  }, [hasNewVariants, product?.variants, productMainImage]);

  // Merge converted variations with existing variations
  const allVariations = useMemo(() => {
    if (hasNewVariants) {
      return convertedData.variations;
    }
    return Array.isArray(product?.variations) ? product.variations : [];
  }, [hasNewVariants, convertedData.variations, product?.variations]);

  // Merge variation options
  const allVariationOptions = useMemo(() => {
    if (hasNewVariants) {
      return convertedData.variationOptions;
    }
    return Array.isArray(product?.variation_options) ? product.variation_options : [];
  }, [hasNewVariants, convertedData.variationOptions, product?.variation_options]);

  // Initialize attributes from product variations
  const initialAttributes: { [key: string]: string } = useMemo(() => {
    const attrs: { [key: string]: string } = {};
    if (hasNewVariants && convertedData.variations.length > 0) {
      // Use converted variations
      convertedData.variations.forEach((variation: Variation) => {
        const attrSlug = variation?.attribute?.slug;
        const firstValue = variation?.attribute?.values?.[0]?.value;
        if (attrSlug && firstValue) {
          attrs[attrSlug] = firstValue;
        }
      });
    } else if (hasOldVariations) {
      // Use old variations structure
      product.variations.forEach((variation: Variation) => {
        const attrSlug = variation?.attribute?.slug;
        const firstValue = variation?.attribute?.values?.[0]?.value;
        if (attrSlug && firstValue) {
          attrs[attrSlug] = firstValue;
        }
      });
    }
    return attrs;
  }, [hasNewVariants, hasOldVariations, convertedData.variations, product?.variations]);

  // Safely extract variations
  const variations = useMemo(() => {
    if (hasNewVariants) {
      // Convert new variants to VariationsType format
      return convertVariantsToVariationsType(product.variants || [], productMainImage);
    }
    // Use old format
    return getVariations(allVariations);
  }, [hasNewVariants, product?.variants, productMainImage, allVariations]);

  // Store selected variation
  const [errorAttributes, setErrorAttributes] = useState<boolean>(false);
  const [selectedVariation, setSelectedVariation] = useState<
    VariationOption | undefined
  >(undefined);

  // Check if all required attributes are selected
  const isSelected = useMemo(() => {
    const variationKeys = Object.keys(variations);
    return variationKeys.every((key) => attributes[key] !== undefined);
  }, [variations, attributes]);

  const sortedAttributeValues = useMemo(
    () => Object.values(attributes).sort(),
    [attributes]
  );

  // Update selectedVariation when attributes change
  useEffect(() => {
    if (!isSelected) return;
    setErrorAttributes(false);

    // Use merged variation options
    const variationOptions = allVariationOptions;

    // For new variants structure, find matching variant directly
    if (hasNewVariants) {
      const matchingVariant = findMatchingVariant(product.variants || [], attributes);
      if (matchingVariant) {
        // Find corresponding variation option
        const newSelectedVariation = variationOptions.find((o: VariationOption) => {
          const variantAttrs: string[] = [];
          if (matchingVariant.storage) variantAttrs.push(matchingVariant.storage);
          if (matchingVariant.ram) variantAttrs.push(matchingVariant.ram);
          if (matchingVariant.color) variantAttrs.push(matchingVariant.color);
          if (matchingVariant.bundle) variantAttrs.push(matchingVariant.bundle);
          if (matchingVariant.warranty) variantAttrs.push(matchingVariant.warranty);

          const optionAttrs = o.attributes?.map((attr: any) => attr.value).sort() || [];
          return isEqual(variantAttrs.sort(), optionAttrs);
        });
        setSelectedVariation(newSelectedVariation);
      }
    } else {
      // Use old matching logic
      const newSelectedVariation = variationOptions.find((o: VariationOption) =>
        isEqual(
          o.attributes?.map((attr: any) => attr.value).sort(),
          sortedAttributeValues
        )
      );
      setSelectedVariation(newSelectedVariation);
    }
  }, [isSelected, hasNewVariants, allVariationOptions, sortedAttributeValues, attributes]);

  return {
    variations,
    selectedVariation,
    isSelected,
    errorAttributes,
    initialAttributes,
  };
}

export default useProductVariations;
