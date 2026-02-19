export function getCategoryOptionsViewData(category) {
    const options = [
        { value: '', title: '— Select category —', placeholder: true },
        { value: 'tv-show', title: 'TV Show' },
        { value: 'animation', title: 'Animation' },
        { value: 'movie', title: 'Movie' },
        { value: 'documentary', title: 'Documentary' },
        { value: 'short-film', title: 'Short Film' },
    ];

    const result = options.map(option => ({ ...option, selected: category === option.value ? 'selected' : '' }));

    return result;
};