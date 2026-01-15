export const contentRoot = {
    content: () => [
        {
            __typename: 'Article',
            id: '1',
            title: 'Article example',
            publishedAt: '2024-01-01',
            bodyText: 'Some text'
        },
        {
            __typename: 'PodcastEpisode',
            id: '2',
            title: 'Podcast example',
            publishedAt: '2024-01-02',
            audioUrl: 'https://cdn.example.com/audio.mp3'
        }
    ],

    ContentItem: {
        __resolveType(value) {
            if (value.bodyText != null) return 'Article';
            if (value.audioUrl != null) return 'PodcastEpisode';
            return null;
        }
    }
};
