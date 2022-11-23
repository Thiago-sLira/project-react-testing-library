import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <PokemonDetails.js />', () => {
  test('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.queryByRole('link', { name: /more details/i }));

    const pokeDetails = screen.getByRole('heading', { leve: 2, name: /pikachu details/i });
    expect(pokeDetails).toBeInTheDocument();
    expect(pokeDetails.textContent).toBe('Pikachu Details');

    expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { leve: 2, name: /summary/i }).textContent).toBe('Summary');

    const textPokemonSummary = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(textPokemonSummary).toBeInTheDocument();
  });
  test('se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.queryByRole('link', { name: /more details/i }));

    const textPokemonLocations = screen.getByRole('heading', { level: 2, name: /game locations of pikachu/i });
    expect(textPokemonLocations).toBeInTheDocument();

    const imagePokemonLocation = screen.getAllByRole('img').filter(({ alt }) => alt !== 'Pikachu sprite');
    imagePokemonLocation.forEach((imageLocation) => {
      expect(imageLocation).toBeInTheDocument();
      expect(imageLocation.alt).toBe('Pikachu location');
    });

    expect(imagePokemonLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagePokemonLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.queryByRole('link', { name: /more details/i }));

    const pokemonFavoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(pokemonFavoriteCheck).toBeInTheDocument();

    userEvent.click(pokemonFavoriteCheck);

    const imageFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imageFavorite).toBeInTheDocument();

    userEvent.click(pokemonFavoriteCheck);

    expect(imageFavorite).not.toBeInTheDocument();

    const checkboxLabel = screen.getByLabelText(/Pokémon favoritado/i);
    expect(checkboxLabel).toBeTruthy();
  });
});
