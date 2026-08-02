
const Soap = require("../src/soap/soap.model");
const { getAll, getById, insert, update, remove } = require("../src/soap/soap.data.service");

describe('Soap Data Service', () => {
  
    describe('getAll()', () => {
        it('returns array with correct properties', async () => {
            const rows = await getAll();
            expect(Array.isArray(rows)).toBe(true);
        if (rows.length) {
            expect(rows[0]).toHaveProperty('soap_id');
            expect(rows[0]).toHaveProperty('soap_name');
            expect(rows[0]).toHaveProperty('description');
            expect(rows[0]).toHaveProperty('created_by');
        }
        });
    });

    describe('getById()', () => {
        it('returns valid soap for existing ID', async () => {
            const s = await getById(2);
            expect(s).not.toBeNull();
            expect(s.soap_id).toBe(2);
            expect(s.soap_name).toBe('Rose Radiance');
            expect(s.created_by).toBe(3);
        });

        it('returns null for non-existing ID', async () => {
            const s = await getById(999999);
            expect(s).toBeNull();
        });
    });

  describe('insert()', () => {
        it('returns new id when valid soap inserted', async () => {
            const soapToInsert = new Soap({
                soap_name: 'API Test Soap',
                description: 'gentle',
                created_by: 1
        });
            const id = await insert(soapToInsert);
            expect(id).toBeGreaterThan(0);

            const row = await getById(id);
            expect(row.soap_id).toBe(id);
            expect(row.soap_name).toBe('API Test Soap');
            expect(row.created_by).toBe(1);
        });

        it('throws for null input', async () => {
            await expect(insert(null)).rejects.toThrow(/cannot be null/i);
        });

        it('throws for non-Soap input', async () => {
            await expect(insert('BAD')).rejects.toThrow(/Invalid Soap/i);
        });

        it('throws for validation failure', async () => {
            const bad = new Soap({ soap_name: '', description: 'x', created_by: 0 });
            await expect(insert(bad)).rejects.toThrow(/Invalid Soap/i);
        });
    });

  describe('update()', () => {
        it('returns true on successful update', async () => {
            const toCreate = new Soap({ soap_name: 'Before', description: 'd', created_by: 1 });
            const id = await insert(toCreate);

            const updated = new Soap({ soap_id: id, soap_name: 'After', description: 'dd', created_by: 1 });
            const ok = await update(updated);
            expect(ok).toBe(true);

            const row = await getById(id);
            expect(row.soap_name).toBe('After');
            expect(row.description).toBe('dd');
        });

        it('throws for invalid object', async () => {
            await expect(update('BAD')).rejects.toThrow(/Invalid parameter/i);
        });

        it('throws when id does not exist', async () => {
            const missing = new Soap({ soap_id: 77, soap_name: 'X', description: 'Y', created_by: 1 });
            await expect(update(missing)).rejects.toThrow(/Soap not found/i);
        });
    });

  describe('remove()', () => {
        it('returns true for successful delete', async () => {
            const s = new Soap({ soap_name: 'To Delete', description: 'z', created_by: 1 });
            const id = await insert(s);
            const ok = await remove(id);
            expect(ok).toBe(true);
            const after = await getById(id);
            expect(after).toBeNull();
        });

        it('returns false for non-existing id', async () => {
            const ok = await remove(888888);
            expect(ok).toBe(false);
        });
    });
});
