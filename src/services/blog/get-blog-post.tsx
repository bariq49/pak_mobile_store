import { API_RESOURCES } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import {useQuery} from '@tanstack/react-query';

const fetchBlogPost = async () => {
  const { data } = await http.get(API_RESOURCES.BLOGDETAILS);
  return data;

};

const useBlogPostQuery = () => {
  return useQuery({
    queryKey: ['blogPost'],
    queryFn: () => fetchBlogPost(),
  });
 
};

export { useBlogPostQuery, fetchBlogPost };
