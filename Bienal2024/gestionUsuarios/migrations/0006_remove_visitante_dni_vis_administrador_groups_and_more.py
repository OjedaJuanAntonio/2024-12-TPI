# Generated by Django 4.2.16 on 2024-10-20 15:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('gestionEscultores', '0006_remove_escultor_dni_adm_escultor_telefono_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gestionVotos', '0002_alter_voto_visitante'),
        ('gestionUsuarios', '0005_alter_persona_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='visitante',
            name='DNI_Vis',
        ),
        migrations.AddField(
            model_name='administrador',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='Los grupos a los que pertenece el usuario.', related_name='persona_set', to='auth.group'),
        ),
        migrations.AddField(
            model_name='administrador',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='administrador',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='administrador',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
        migrations.AddField(
            model_name='administrador',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='administrador',
            name='password',
            field=models.CharField(default='1234', max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='administrador',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Permisos específicos para este usuario.', related_name='persona_user_permissions_set', to='auth.permission'),
        ),
        migrations.AlterField(
            model_name='administrador',
            name='DNI_Adm',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Persona',
        ),
        migrations.DeleteModel(
            name='Visitante',
        ),
    ]
