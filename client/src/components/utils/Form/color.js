const color = [{
        '_id': 1,
        'name': 'Black'
    },
    {
        '_id': 2,
        'name': 'Navy Blue'
    },
    {
        '_id': 3,
        'name': 'Brown'
    },
    {
        '_id': 4,
        'name': 'Red'
    },
    {
        '_id': 5,
        'name': 'Blue'
    },
];

const price = [{
        '_id': 0,
        'name': 'Any',
        'array': []
    },
    {
        '_id': 1,
        'name': '$0 to $299',
        'array': [0, 299]
    },
    {
        '_id': 2,
        'name': '$300 to $599',
        'array': [300, 599]
    },
    {
        '_id': 3,
        'name': '$600 to $999',
        'array': [600, 999]
    },
    {
        '_id': 4,
        'name': '$1000 to $1999',
        'array': [1000, 1999]
    },
    {
        '_id': 5,
        'name': 'More than $2000',
        'array': [2000, 199999]
    }

];
export {
    color,
    price
}