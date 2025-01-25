import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const uri = import.meta.env.VITE_APP_API_URI 


const client = new ApolloClient({
  link: new HttpLink({
    uri: uri || 'http://localhost:4000/graphql',
    useGETForQueries: true,
  }),
  cache: new InMemoryCache(),
});

export default client;
