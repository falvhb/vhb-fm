<#import "/macros/teaser.ftl" as macro>
<#import "/macros/core.ftl" as core>
<@core.html>
    Hello ${user}

    <#if (inIsPremiumTeaser!false)>
        Premium
    </#if>

    <#list teasers as teaser>
        <@macro.teaser context=teaser /> 
    </#list>

    <#include "components/greeting.ftl">
</@core.html>