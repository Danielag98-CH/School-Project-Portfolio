
const Soap = require("../src/soap/soap.model");

describe('Soap Model', () => {
    
    describe('Constructor', () => {
        it('sets instance variables properly', () => {
            const s = new Soap({
                soap_id: 2,
                soap_name: 'Rose Radiance',
                description: 'Moisturizing soap with rosehip oil and beeswax.',
                created_by: 3
        });
            expect(s.soap_id).toBe(2);
            expect(s.soap_name).toBe('Rose Radiance');
            expect(s.description).toMatch(/rosehip/i);
            expect(s.created_by).toBe(3);
        });
    });

    describe('validate()', () => {
        it('passes with valid data', () => {
            const s = new Soap({ soap_name: 'Lavender Bliss', description: 'Calming', created_by: 1 });
            const [ok, errors] = s.validate();
            expect(ok).toBe(true);
            expect(errors).toEqual({});
        });

        it('fails when soap_name missing', () => {
            const s = new Soap({ soap_name: '', description: 'x', created_by: 1 });
            const [ok, errors] = s.validate();
            expect(ok).toBe(false);
            expect(errors).toHaveProperty('soap_name', 'Soap name is required');
        });

        it('fails when description too long', () => {
            const s = new Soap({ soap_name: 'A', description: 'x'.repeat(151), created_by: 1 });
            const [ok, errors] = s.validate();
            expect(ok).toBe(false);
            expect(errors).toHaveProperty('description', 'Description must be 150 characters or less');
        });

        it('fails when created_by not positive int', () => {
            const s = new Soap({ soap_name: 'A', description: 'ok', created_by: 0 });
            const [ok, errors] = s.validate();
            expect(ok).toBe(false);
            expect(errors).toHaveProperty('created_by', 'created_by must be greater than 0');
        });
    });
});
