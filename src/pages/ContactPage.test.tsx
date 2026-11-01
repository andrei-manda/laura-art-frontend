import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

function mockPage() {
  return vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });
}

async function renderPage() {
  render(<MemoryRouter><ContactPage /></MemoryRouter>);
  return screen.findByRole('textbox', { name: /mesaj/i });
}

it('has no subject picker — only name, email and message', async () => {
  vi.stubGlobal('fetch', mockPage());
  await renderPage();

  expect(screen.queryByText(/what is it about/i)).toBeNull();
  expect(screen.queryByRole('button', { name: /commission/i })).toBeNull();
  expect(screen.getByRole('textbox', { name: /nume/i })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
});

it('blocks submission and reports per-field errors when the form is empty', async () => {
  const user = userEvent.setup();
  const fetchMock = mockPage();
  vi.stubGlobal('fetch', fetchMock);
  await renderPage();

  await user.click(screen.getByRole('button', { name: /trimite mesajul/i }));

  expect(await screen.findByText(/scrie-ți numele/i)).toBeInTheDocument();
  expect(screen.getByText(/email validă/i)).toBeInTheDocument();
  expect(fetchMock).not.toHaveBeenCalledWith(
    expect.stringContaining('contact-submissions'),
    expect.anything(),
  );
});

it('posts name, email and message without a subject, then shows the success card', async () => {
  const user = userEvent.setup();
  const fetchMock = vi.fn().mockImplementation((_url: string, init?: RequestInit) =>
    Promise.resolve(
      init?.method === 'POST'
        ? { ok: true, json: () => Promise.resolve({ ok: true }) }
        : { ok: true, json: () => Promise.resolve({}) },
    ),
  );
  vi.stubGlobal('fetch', fetchMock);
  await renderPage();

  await user.type(screen.getByRole('textbox', { name: /nume/i }), 'Ana');
  await user.type(screen.getByRole('textbox', { name: /email/i }), 'ana@example.com');
  await user.type(screen.getByRole('textbox', { name: /mesaj/i }), 'A ring, please.');
  await user.click(screen.getByRole('button', { name: /trimite mesajul/i }));

  await waitFor(() => expect(screen.getByText(/mulțumesc/i)).toBeInTheDocument());

  const post = fetchMock.mock.calls.find(([, init]) => (init as RequestInit | undefined)?.method === 'POST');
  expect(post).toBeDefined();
  const sent = JSON.parse((post![1] as RequestInit).body as string).data;
  expect(sent).toMatchObject({ name: 'Ana', email: 'ana@example.com', message: 'A ring, please.' });
  expect(sent).not.toHaveProperty('subject');
});
