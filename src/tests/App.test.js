import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <App.js />', () => {
  test('se o topo da aplicação contem um conjunto fixo de links de navegações', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonLink).toBeInTheDocument();
  });
  test('se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });
  test('se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });
  test('se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(favoritePokemonLink);

    expect(history.location.pathname).toBe('/favorites');
  });
  test('se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('Ikkakumon');
    });

    const notFoundText = screen.getByRole('heading', { name: /page requested not found/i });
    const notFoundImage = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(notFoundText).toBeInTheDocument();
    expect(notFoundImage).toBeInTheDocument();
  });
});

// Acessar
// Agir
// Aferir
