export const createMockFor = (
    query: any,
    data: any,
    variables: Record<string, any> = {},
    count: number = 5
  ) =>
    Array(count).fill(null).map(() => ({
      request: { query, variables },
      result: { data },
    }));