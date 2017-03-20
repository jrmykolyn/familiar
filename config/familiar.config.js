module.exports = {
    commit: {
        insertBranchName: true,
        excludeBranches: [
            'master', 'develop', 'staging'
        ],
        delimiter: " | "
    }
};
