from django.contrib import admin
from .models import HeroSettings, AboutSettings, Service, Project, ProjectImage, Skill, MarqueeItem, SocialLink

@admin.register(HeroSettings)
class HeroSettingsAdmin(admin.ModelAdmin):
    list_display = ('name', 'role_description')
    
    def has_add_permission(self, request):
        # Allow adding if there are no instances
        return not HeroSettings.objects.exists()

@admin.register(AboutSettings)
class AboutSettingsAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'main_text')
    
    def has_add_permission(self, request):
        return not AboutSettings.objects.exists()

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('number', 'name', 'order')
    list_editable = ('order',)
    ordering = ('order', 'number')

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 3  # Suggest 3 blank image slots by default

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('number', 'name', 'category', 'order')
    list_editable = ('order',)
    inlines = [ProjectImageInline]
    ordering = ('order', 'number')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'order')
    list_editable = ('level', 'order')
    ordering = ('order', 'name')

@admin.register(MarqueeItem)
class MarqueeItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'image_url', 'image_file')
    list_editable = ('order',)
    ordering = ('order', 'id')

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url', 'order')
    list_editable = ('order',)
    ordering = ('order', 'platform')
