<div className={style.github_contributors} id="github_contributors">
  {contributeLoading && <span>Loading...</span>}
  {contributeData && <ContributeGraph contributeData={contributeData}/>}
</div>