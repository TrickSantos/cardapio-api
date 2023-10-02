import permissions from '@helpers/constants/default/organization/permissions';

export default [
    {
        name: 'Administrador',
        permissions: permissions.map((permission) => permission.name),
    },
    {
        name: 'Gerente',
        permissions: [
            { name: 'CreateUser', description: 'Criar usuário' },
            { name: 'ReadUser', description: 'Ler usuário' },
            { name: 'UpdateUser', description: 'Atualizar usuário' },
            { name: 'DeleteUser', description: 'Excluir usuário' },

            { name: 'CreateContact', description: 'Criar contato' },
            { name: 'ReadContact', description: 'Ler contato' },
            { name: 'UpdateContact', description: 'Atualizar contato' },
            { name: 'DeleteContact', description: 'Excluir contato' },
            { name: 'ReadPlace', description: 'Ler local' },
            { name: 'UpdatePlace', description: 'Atualizar local' },
            { name: 'CreateCategory', description: 'Criar categoria' },
            { name: 'ReadCategory', description: 'Ler categoria' },
            { name: 'UpdateCategory', description: 'Atualizar categoria' },
            { name: 'DeleteCategory', description: 'Excluir categoria' },

            { name: 'CreateProduct', description: 'Criar produto' },
            { name: 'ReadProduct', description: 'Ler produto' },
            { name: 'UpdateProduct', description: 'Atualizar produto' },
            { name: 'DeleteProduct', description: 'Excluir produto' },

            { name: 'CreatePrice', description: 'Criar preço' },
            { name: 'ReadPrice', description: 'Ler preço' },
            { name: 'UpdatePrice', description: 'Atualizar preço' },
            { name: 'DeletePrice', description: 'Excluir preço' },

            { name: 'CreateMenu', description: 'Criar menu' },
            { name: 'ReadMenu', description: 'Ler menu' },
            { name: 'UpdateMenu', description: 'Atualizar menu' },
            { name: 'DeleteMenu', description: 'Excluir menu' },

            { name: 'CreateImage', description: 'Criar imagem' },
            { name: 'ReadImage', description: 'Ler imagem' },
            { name: 'UpdateImage', description: 'Atualizar imagem' },
            { name: 'DeleteImage', description: 'Excluir imagem' },
        ],
    },
    {
        name: 'Atendente',
        permissions: [
            {
                name: 'ReadOrganizationRole',
                description: 'Ler papel de organização',
            },
            { name: 'ReadUser', description: 'Ler usuário' },
            { name: 'ReadContact', description: 'Ler contato' },
            { name: 'UpdateContact', description: 'Atualizar contato' },
            { name: 'ReadPlace', description: 'Ler local' },
            { name: 'ReadCategory', description: 'Ler categoria' },
            { name: 'ReadProduct', description: 'Ler produto' },
            { name: 'ReadPrice', description: 'Ler preço' },
            { name: 'ReadMenu', description: 'Ler menu' },
            { name: 'ReadImage', description: 'Ler imagem' },
        ],
    },
    {
        name: 'Cliente',
        permissions: [
            {
                name: 'ReadOrganizationRole',
                description: 'Ler papel de organização',
            },
            { name: 'ReadUser', description: 'Ler usuário' },
            { name: 'ReadContact', description: 'Ler contato' },
            { name: 'UpdateContact', description: 'Atualizar contato' },
            { name: 'ReadPlace', description: 'Ler local' },
            { name: 'ReadCategory', description: 'Ler categoria' },
            { name: 'ReadProduct', description: 'Ler produto' },
            { name: 'ReadPrice', description: 'Ler preço' },
            { name: 'ReadMenu', description: 'Ler menu' },
            { name: 'ReadImage', description: 'Ler imagem' },
        ],
    },
    {
        name: 'Entregador',
        permissions: [
            {
                name: 'ReadOrganizationRole',
                description: 'Ler papel de organização',
            },
            { name: 'ReadUser', description: 'Ler usuário' },
            { name: 'ReadContact', description: 'Ler contato' },
            { name: 'UpdateContact', description: 'Atualizar contato' },
            { name: 'ReadPlace', description: 'Ler local' },
            { name: 'ReadCategory', description: 'Ler categoria' },
            { name: 'ReadProduct', description: 'Ler produto' },
            { name: 'ReadPrice', description: 'Ler preço' },
            { name: 'ReadMenu', description: 'Ler menu' },
            { name: 'ReadImage', description: 'Ler imagem' },
        ],
    },
];
