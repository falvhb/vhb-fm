<#import "headline.ftl" as headline>
<#macro component context>
    <div data-macro="article.component">
        <@headline.headline context=context.title />
        ${context.contentHTML}
    </div>
</#macro>