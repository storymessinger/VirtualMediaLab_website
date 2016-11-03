$(function(){
    
    $('#work').each(function(){
        
        var $tabList      = $(this).find('.main-nav-list'),
            $tabAnchors   = $tabList.find('a'),
            $tabPanels    = $(this).find('.tabs-panel');
        
        $tabList.on('click', 'a', function(event){
            
            // 링크를 클릭했을 때의 기본 동작을 취소
            event.preventDefault();
            
            // 클릭한  탭을 jQuery 객체화함
            var $this = $(this);
            
            // 이미 선택한 탭이라면 아무 효과 적용 않고 실행 중지
            if ($this.hasClass('active')) {
                return;
            }
            
            // 모든 탭의 선택 상태를 해제
            // 클릭한 탭을 선택한 상태로 둠
            $tabAnchors.removeClass('active');
            $this.addClass('active');
            
            // 모든 패널을 일단 숨김
            // 클릭한 탭에 대응하는 패널을 표시
            $tabPanels.hide();
            $($this.attr('href')).show();
            alert(attr('href'));
            
            // 첫 번째 탭을 선택한 상태로 둠
            $tabAnchors.eq(0).trigger('click');
        })
    });
    
});