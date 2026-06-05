const fs = require('fs');
const path = require('path');

describe('Book Inventory UI', () => {
  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
    // Inject the HTML content into the JSDOM environment provided by Jest
    document.documentElement.innerHTML = html.toString();
  });

  test('should render the correct page title and headers', () => {
    expect(document.querySelector('h1').textContent).toBe('Book Inventory');
    
    const headers = Array.from(document.querySelectorAll('th')).map(th => th.textContent);
    expect(headers).toEqual(['Title', 'Author', 'Category', 'Status', 'Rate']);
  });

  test('should validate the integrity of all book rows', () => {
    const rows = document.querySelectorAll('tbody tr');
    const expectedData = [
      { title: 'The lord of the rings', class: 'to-read', status: 'To Read' },
      { title: 'Harry Potter', class: 'in-progress', status: 'In Progress' },
      { title: 'To Kill a Mockingbird', class: 'read', status: 'Read' }
    ];

    expect(rows.length).toBe(expectedData.length);

    rows.forEach((row, index) => {
      const expected = expectedData[index];
      expect(row.cells[0].textContent).toBe(expected.title);
      expect(row.classList.contains(expected.class)).toBe(true);
      expect(row.querySelector('.status').textContent).toBe(expected.status);
    });
  });

  test('should verify specific rating classes for the "Read" book', () => {
    const readRowRates = document.querySelectorAll('tr.read .rate');
    const expectedClasses = ['one', 'two', 'three'];
    
    expect(readRowRates.length).toBe(3);
    expectedClasses.forEach((className, i) => {
      expect(readRowRates[i].classList.contains(className)).toBe(true);
    });
  });
});