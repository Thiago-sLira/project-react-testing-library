import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <FavoritePokemon.js', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const textNoFavorite = screen.getByText(/no favorite pokémon found/i);

    expect(textNoFavorite).toBeInTheDocument();
  });
  test('se são exibidos todos os cards de Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemon/25');

    const pokemonFavoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(pokemonFavoriteCheck).toBeInTheDocument();

    userEvent.click(pokemonFavoriteCheck);
    const imageFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imageFavorite).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(history.location.pathname).toBe('/pokemon/4');

    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));

    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemonLink);
    expect(history.location.pathname).toBe('/favorites');

    const pikachuFavorite = screen.getByText(/pikachu/i);
    expect(pikachuFavorite).toBeInTheDocument();
    const charmanderFavorite = screen.getByText(/charmander/i);
    expect(charmanderFavorite).toBeInTheDocument();
  });
});

// Acessar
// Agir
// Aferir
