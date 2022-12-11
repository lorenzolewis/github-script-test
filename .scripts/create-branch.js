module.exports = async ({ github, context }) => {
  try {
    await github.rest.git.getRef({
      owner: context.owner,
      repo: context.repo,
      ref: "${{ env.I18N_BRANCH }}",
    });
    console.log("Found existing branch");
  } catch (error) {
    if (error.name === "HttpError" && error.status === 422) {
      console.log("No branch found, creating a new one...");
      await github.rest.git.createRef({
        owner: context.owner,
        repo: context.repo,
        ref: "refs/heads/${{ env.I18N_BRANCH }}",
        sha: context.sha,
      });
      console.log("New branch created");
    } else {
      console.log("An unexpected error occurred:", error);
    }
  }
};
