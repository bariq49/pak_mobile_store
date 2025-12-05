import {Blog} from '@/services/types';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import {useQuery} from '@tanstack/react-query';

const fetchBlogs = async () => {
  const { data } = await http.get(API_RESOURCES.BLOGS);
  return data as Blog[] ;
};


const useBlogsQuery = () => {
  return useQuery({
    queryKey: [API_RESOURCES.BLOGS],
    queryFn: () => fetchBlogs(),
  });
 
};

export { useBlogsQuery, fetchBlogs };
