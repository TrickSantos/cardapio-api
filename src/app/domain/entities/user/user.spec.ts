import { Contact } from './contact/contact';
import { User } from './user';

describe('User', () => {
    it('should create a user', () => {
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            contact: new Contact({
                firstName: 'first-name',
                lastName: 'last-name',
                email: 'email',
                phone: 'phone',
            }),
            isActive: true,
            password: 'password',
        });

        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
    });

    it('should update a user', () => {
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            contact: new Contact({
                firstName: 'first-name',
                lastName: 'last-name',
                email: 'email',
                phone: 'phone',
            }),
            isActive: true,
            password: 'password',
        });

        user.update({
            username: 'new-username',
        });

        expect(user.username).toBe('new-username');
    });
});
