import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testando o componente <Pokedex.js />', () => {
  test('se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const titlePokedex = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton.textContent).toBe('Próximo Pokémon');

    data.forEach(({ name }) => {
      expect(screen.getByText(`${name}`)).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
      if (name === (data[data.length - 1].name)) {
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      }
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez', async () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonPikachu = screen.getByText(/pikachu/i);

    expect(pokemonPikachu).toBeInTheDocument();
    userEvent.click(nextPokemonButton);

    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(nextPokemonButton);

    expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { history } = renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    const typesScreen = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonsByType = screen.getAllByTestId('pokemon-type-button');
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(buttonAll).toBeInTheDocument();

    buttonsByType.forEach((type, index) => {
      expect(typesScreen[index]).toBe(type.textContent);
      expect(type).toHaveTextContent(typesScreen[index]);
    });

    userEvent.click(buttonsByType[1]);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonsByType[4]);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();

    expect(buttonAll).toBeInTheDocument();

    expect(buttonAll).toHaveTextContent('All');
    userEvent.click(buttonAll);

    data.forEach(({ name }) => {
      expect(screen.getByText(`${name}`)).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });

    act(() => {
      history.go(history.length - 1);
    });

    data.forEach(({ name }) => {
      expect(screen.getByText(`${name}`)).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    const { history } = renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toHaveTextContent('All');

    data.forEach(({ name }) => {
      expect(screen.getByText(`${name}`)).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });

    act(() => {
      history.go(history.length - 1);
    });

    data.forEach(({ name }) => {
      expect(screen.getByText(`${name}`)).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
  });
});

// Acessar
// Agir
// Aferir
