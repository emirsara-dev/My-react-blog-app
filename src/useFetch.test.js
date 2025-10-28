import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from './useFetch';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('useFetch custom hook', () => {
//   it('should initialize with default states', () => {
//     const { result } = renderHook(() => useFetch('https://fake.url'));

//     expect(result.current.data).toBeNull();
//     expect(result.current.isPending).toBe(true);
//     expect(result.current.error).toBeNull();
//   });

  it('should fetch and set data successfully', async () => {
    const mockData = [{ id: 1, title: 'Test Blog' }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://fake.url')
    );

    await waitForNextUpdate(); // wait for data to update

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error (non-OK response)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://fake.url')
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBe('Could not fetch the data for that resource');
  });

  it('should handle network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://fake.url')
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBe('Network Error');
  });
});
