import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

test('initial behaviour', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const button = screen.getByRole('button', { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();

  expect(button).toBeDisabled();
});

test('checkbox enable button on first click and then disable button on second click', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const button = screen.getByRole('button', { name: /confirm order/i });

  userEvent.click(checkbox);

  expect(button).toBeEnabled();

  userEvent.click(checkbox);

  expect(button).toBeDisabled();
});

test('popover response to hover', async () => {
  render(<SummaryForm />);

  const nullPopOver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopOver).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  userEvent.hover(termsAndConditions);

  const popOver = screen.getByText(/no ice cream will actually be delivered/i);

  expect(popOver).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
