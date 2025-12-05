import groupBy from 'lodash/groupBy';
import {Variation} from "@/services/types";


export function getVariations(variations: Variation[] = []) {
  // Flatten all attribute values from variations
  const allAttributes = variations.flatMap((variation) => {
    if (!variation?.attribute?.values) return [];
    return variation.attribute.values.map((val) => ({
      id: val.id,
      attribute_id: val.attribute_id,
      value: val.value,
      image: val.image,
      attributeSlug: variation.attribute.slug,
      attributeType: variation.attribute.type, // ADD type
    }));
  });
  
  // Group by attributeSlug (example: color, memory-storage)
  const grouped = groupBy(allAttributes, 'attributeSlug');
  
  // Clean up grouped result
  const cleaned = Object.keys(grouped).reduce((acc: any, key) => {
    acc[key] = {
      type: grouped[key][0].attributeType,
      options: grouped[key].map(({ id, attribute_id, value, image }) => ({ id, attribute_id, value, image })),
    };
    return acc;
  }, {});

  return cleaned;
}
