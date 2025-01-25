import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import FilterOptions from './components/FilterOptions';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ backgroundColor: '#001529', color: 'white', textAlign: 'center' }}>
          <h1 style={{ color: 'white', margin: 0 }}>Recipe App</h1>
        </Header>
        <Content style={{ padding: '20px 50px' }}>
          <SearchBar />
          <FilterOptions />
          <RecipeList />
          <FavoritesList />
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2025 Recipe App</Footer>
      </Layout>
    </Provider>
  );
}

export default App;
